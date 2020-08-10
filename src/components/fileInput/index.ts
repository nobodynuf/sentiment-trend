import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import axios from '@/axios'
import { AxiosResponse } from 'axios'
import { Subreddit, RedditUser, Hashtag, TwitterUser, Analysis} from '@/types'
import { error } from 'highcharts'
@Component({
    components:{
    }
})
export default class FileInput extends Vue {
    @Prop({default : ""})
    datatype!: String //PostedSubreddits | PostedRedditUsers | PostedHashtags | PostedTwitterUsers

    file : File | null = null

    fileInputDisabled : boolean = true
    loading : boolean = false
    
    snackbar: boolean = false
    snackbarTime: number = 8000
    snackbarColor = ""
    text: string = ''
    
    entries : number | undefined
    rules = [
        (value: { name: string }) => !value || value.name.split('.').pop() =="xlsx" || 'La extension del archivo deber ser .xlsx'
    ]

    
    async submitFile() {
        this.loading = true
        this.fileInputDisabled = true
        this.entries = undefined
        let formData = new FormData();
        if(this.file){
            formData.append('plantilla', this.file);
        }

        //sending template
        
        //reddit
        if(this.datatype == "PostedSubreddits"){
            const data = await this.getRedditSubreddits(formData)
            if(data != null){
                if(data.n_entries > 0){ this.$emit("reddit-sub",data) }
                this.entries = data.n_entries
            }
        }
        else if(this.datatype == "PostedRedditUsers"){
            const data = await this.getRedditUsers(formData)
            if(data != null){
                if(data.n_entries > 0){ this.$emit("reddit-user",data) }
                this.entries = data.n_entries
            }
        }

        //twitter
        else if(this.datatype == "PostedHashtags"){
            const data = await this.getTwitterHashtags(formData)
            if(data != null){
                if(data.n_entries > 0){ this.$emit("twitter-hash", data) }
                this.entries = data.n_entries
            }
        }
        else if(this.datatype == "PostedTwitterUsers"){
            const data = await this.getTwitterUsers(formData)
            if(data != null){
                if(data.n_entries > 0){ this.$emit("twitter-user",  data) }
                this.entries = data.n_entries
            }
        }
        
        this.file = null
        this.loading = false

        //configuring message on screen
        if(this.entries == undefined ){ 
            this.text = "Ocurrió un Error, por favor verifique los datos ingresados en la plantilla"
            this.snackbarColor = "error"
        }else if(this.entries == 0){
            this.text = "No se encontraron registros"
            this.snackbarColor = "success"
        }else if(this.entries == -1){
            this.text = "La plantilla está vacía"
            this.snackbarColor = "success"
        }else{
            this.text = `Se cargaron ${this.entries} registros`     
            this.snackbarColor = "primary"
        }

        this.snackbar = true
    }

    //reddit
    async getRedditSubreddits(formData: FormData){
        try {
            const res : AxiosResponse<{ subreddits : Array<Subreddit>, n_entries : number, analysis : Analysis }> = await axios.post('/reddit/subreddit',formData)
            return res.data;
        } catch(e){
            if( e.response){
                if(e.response.status == 422){
                    this.entries = -1
                    return null
                }
                else{
                    return null
                } 
            }else if(e.request){
                return null
            }else{
                return null
            }
        }
    }
    async getRedditUsers(formData: FormData){
        try {
            const res : AxiosResponse<{ redditUsers : Array<RedditUser>, n_entries : number, analysis : Analysis }> = await axios.post('/reddit/user',formData)
            return res.data;
        } catch(e){
            if( e.response){
                if(e.response.status == 422){
                    this.entries = -1
                    return null
                }
                else{
                    return null
                } 
            }else if(e.request){
                return null
            }else{
                return null
            }
        }
    }

    //twitter
    async getTwitterHashtags(formData: FormData){
        try {
            const res : AxiosResponse<{ hashtags : Array<Hashtag>, n_entries : number, analysis : Analysis }> = await axios.post('/twitter/hashtags',formData)
            return res.data
        } catch(e){
            if( e.response){
                if(e.response.status == 422){
                    this.entries = -1
                    return null
                }
                else{
                    return null
                } 
            }else if(e.request){
                return null
            }else{
                return null
            }
        }
    }
    async getTwitterUsers(formData: FormData){
        try {
            const res : AxiosResponse<{ twitterUsers : Array<TwitterUser>, n_entries : number, analysis : Analysis }> = await axios.post('/twitter/user',formData)
            return res.data;
        } catch(e){
            if( e.response){
                if(e.response.status == 422){
                    this.entries = -1
                    return null
                }
                else{
                    return null
                } 
            }else if(e.request){
                return null
            }else{
                return null
            }
        }
    }

    onFileChange() {
        if(this.file){
            if(this.file.name.split('.').pop()=="xlsx"){
                this.fileInputDisabled = false
            }else{
                this.fileInputDisabled = true
            }
        }else{
            this.fileInputDisabled = true
        }
    }


    //downloading template
    async getTemplate(){
        return await axios.get("/template", {
            responseType: 'blob'
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'template.xlsx');
             document.body.appendChild(link);
             link.click();
          });
    }     
}