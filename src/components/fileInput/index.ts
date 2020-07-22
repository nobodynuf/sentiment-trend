import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import axios from '@/axios'
import { AxiosResponse } from 'axios'
import { PostedSubreddits, PostedRedditUsers, PostedHashtags, PostedTwitterUsers} from '@/store';
import { Subreddit, RedditUser, Hashtag, TwitterUser} from '@/types'
@Component({
    components:{
    }
})
export default class FileInput extends Vue {
    @Prop({default : ""})
    datatype!: String 
    //PostedSubreddits | PostedRedditUsers | PostedHashtags | PostedTwitterUsers
    
 
    file : File | null = null

    fileInputDisabled : boolean = true
    loading : boolean = false
    snackbar: boolean = false
    text: string = ''
    rules = [
        (value: { name: string }) => !value || value.name.split('.').pop() =="xlsx" || 'La extension del archivo deber ser .xlsx'
    ]

    
    async submitFile() {
        this.loading = true
        this.fileInputDisabled = true
        let n_entries = 0
        let formData = new FormData();
        if(this.file){
            formData.append('plantilla', this.file);
        }
        //reddit
        if(this.datatype == "PostedSubreddits"){
            const subreddits = await this.getRedditSubreddits(formData)
            this.$emit("reddit-sub", subreddits)
            n_entries = subreddits.n_entries
        }
        else if(this.datatype == "PostedRedditUsers"){
            const redditUsers = await this.getRedditUsers(formData)
            this.$emit("reddit-user", redditUsers)
            n_entries = redditUsers.n_entries
        }

         //twitter
        else if(this.datatype == "PostedHashtags"){
            const hashtags = await this.getTwitterHashtags(formData)
            this.$emit("twitter-hash", hashtags)
            n_entries = hashtags.n_entries
        }
        else if(this.datatype == "PostedTwitterUsers"){
            const twitterUsers = await this.getTwitterUsers(formData)
            this.$emit("twitter-user", twitterUsers)
            n_entries = twitterUsers.n_entries
        }
        this.file = null
        this.loading = false
        if(n_entries > 0){
            this.text = "Se cargaron " + n_entries + " registros"
        }else{
            this.text = "No se encontraron registros"
        }
        
        this.snackbar = true
    }

    //reddit
    async getRedditSubreddits(formData: FormData){
        const res : AxiosResponse<{ subreddits : Subreddit[], n_entries : number }> = await axios.post('/reddit/subreddit',formData)
        return res.data;
    }
    async getRedditUsers(formData: FormData){
        const res : AxiosResponse<{ redditUsers : RedditUser[], n_entries : number }> = await axios.post('/reddit/user',formData)
        return res.data;
    }

    //twitter
    async getTwitterHashtags(formData: FormData){
        const res : AxiosResponse<{ hashtags : Hashtag[], n_entries : number }> = await axios.post('/twitter/hashtags',formData)
        return res.data;
    }
    async getTwitterUsers(formData: FormData){
        const res : AxiosResponse<{ twitterUsers : TwitterUser[], n_entries : number }> = await axios.post('/twitter/user',formData)
        return res.data;
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

    async getTemplate(){
        return await axios.get("/template", {
            responseType: 'blob'
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'template.xlsx'); //or any other extension
             document.body.appendChild(link);
             link.click();
          });
    }     
}