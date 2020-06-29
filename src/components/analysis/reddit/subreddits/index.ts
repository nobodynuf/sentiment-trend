import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import RTable from '@/components/tables/RTable/index.vue'
import axios from '@/axios'
import { AxiosResponse } from 'axios'
import { Subreddit, DataTable } from '@/types'

@Component({
    components:{
        PieChart,
        LineChart,
        FactorEmo,
        RTable
    }
})
export default class SubredditsAnalyzer extends Vue {
    
    subreddits: Array<Subreddit> = []
    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number, value: number, type: string}[] = []
    loading = false;
    data_title = "Sin datos...";

    //file Input
    file: File | null = null
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

    mounted() {
        this.init()
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

    onUpload() {
        if(this.file){
            this.fileSet.push(this.file)
            this.tableFileSet.push({name: this.file.name})
            this.file = null
            this.fileInputDisabled = true
        }
    }

    deleteFile( file: File ){
        let index = this.tableFileSet.indexOf( file );
        index !== -1 && this.fileSet.splice( index, 1 );
        index !== -1 && this.tableFileSet.splice( index, 1 );
    }

    async init(){
        this.loading = true;
        this.data_title = "Cargando registros por defecto..."
        this.subreddits = await this.getSubreddits();
        let total = 0
        Object.keys(this.subreddits[0].analysis).map(key => {
            this.$set(this.analysis, key, 0);
        })
        this.subreddits.map(subreddit => {
            Object.keys(subreddit.analysis).map(key => {
                let sum = this.analysis[key] + subreddit.analysis[key];
                this.$set(this.analysis, key, sum);
                total += subreddit.analysis[key];
            });
        })
        
        Object.keys(this.analysis).map(key => {
            let div = this.analysis[key]/this.subreddits.length;
            this.$set(this.analysis, key, div);
            this.pie_analysis.push({
                name: key.replace(/[_]/gi," "),
                value: this.analysis[key],
                y: this.analysis[key]*100/total,
                type: "pie"
            })
        });
        this.$set(this.subreddits, "subreddit", this.subreddits)
        this.data_title = "X Registros";
        this.loading = false;
    }

    async getSubreddits(){
        const res : AxiosResponse<{subreddits: Array<Subreddit>}> = await axios.get("/reddit/subreddit");
        return res.data.subreddits;
    }

}