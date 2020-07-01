import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import axios from '@/axios'
import { AxiosResponse } from 'axios'
import { RedditUser, DataTable } from '@/types'

@Component({
    components:{
    }
})
export default class FileInput extends Vue {
    //file Input
    file!: File
    fileSet : File[] =[]

    fileInputDisabled : boolean = true

    tableFileSet : Array<{name : String}> = []
    rules = [
        (value: { name: string }) => !value || value.name.split('.').pop() =="xlsx" || 'La extension del archivo deber ser .xlsx'
    ]
     subTable = new DataTable({
        headers: [
            {
                text: "Nombre",
                value: "name"
            },
            {
                text: "",
                value: "_actions"
            }
        ]
    });

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
    
    async submitFile() {
        let formData = new FormData();
        formData.append('plantilla', this.file);
  
        let res = await axios.post('/reddit/user',
        formData,  {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
          )
        console.log(res.data)
      }

    onFileChange() {
        if(this.file){
            if(this.file.name.split('.').pop()=="xlsx"){
                this.fileInputDisabled = false
            }else{
                this.fileInputDisabled = true
            }
        }
    }
/*
    onUpload() {
        if(this.file){
            this.fileSet.push(this.file)
            this.tableFileSet.push({name: this.file.name})
            this.file = null
            this.fileInputDisabled = true
        }
    }*/

    deleteFile( file: File ){
        let index = this.tableFileSet.indexOf( file );
        index !== -1 && this.fileSet.splice( index, 1 );
        index !== -1 && this.tableFileSet.splice( index, 1 );
    }



}