import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import FactorPie from "@/components/charts/FactorPie/index.vue"
import FactorEmo from '@/components/factors/index.vue'
import RTable from '@/components/tables/reddit/RTable/index.vue'
import FileInput from '@/components/fileInput/index.vue'
import axios from '@/axios'
import { AxiosResponse } from 'axios'
import { Subreddit, tfactor, Analysis } from '@/types'
import { SocialMedia, PostedSubreddits } from '@/store'

@Component({
    components:{
        PieChart,
        FactorPie,
        FactorEmo,
        RTable,
        FileInput
}
})
export default class SubredditsAnalyzer extends Vue {
    tab: string = "tab-2"
    socialMedia : SocialMedia = "reddit"
    fileInputType : String =  "PostedSubreddits"
    data_title = "Sin datos ";
    loading = false;

    subredditsData! : PostedSubreddits
    subreddits: Array<Subreddit> = []

    risersSplittedData : {[key: string] : Analysis} = {}
    titleOfEmotionalManifestation = "manifestación emocional por Subreddits"

    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number, value: number, type: string}[] = []
 
    mounted() {
        this.init()
    }

    async init(){
        this.loading = true;
        this.pie_analysis = []
        this.risersSplittedData = {}

        //getting data from store
        this.subredditsData = this.$store.state.posted_data.reddit.subreddits_data
        //loading data from store
        if( this.subredditsData.n_entries != 0 ){
            this.data_title = "Cargando plantilla de datos "

            //used in emo-factor
            this.analysis = this.subredditsData.analysis

            //used in table
            this.subreddits = this.subredditsData.subreddits;

            //loading data for the first chart
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie"
                })
            });

            //loading data for second chart
            this.subreddits.map((subreddit : Subreddit) => {
                this.risersSplittedData[subreddit.name] = subreddit.analysis
            })

            this.data_title = `${ this.subredditsData.n_entries} Registros`;
        

        //loading data by default
        }else{
            this.data_title = "Cargando registros por defecto "

            this.subredditsData = this.$store.state.default_data.reddit.subreddits_data

            if(this.subredditsData.n_entries == 0){
                //getting data
                const {n_entries ,subreddits, analysis} = await this.getSubreddits();
                
                //updating data in store
                this.subredditsData.n_entries = n_entries
                this.subredditsData.subreddits = subreddits
                this.subredditsData.analysis = analysis

                this.$store.commit("set_default_data", { 
                    SocialMedia : this.socialMedia, 
                    grouped: 1,
                    PostedSubreddits : this.subredditsData
                });
            }
            
            //used in emo-factor
            this.analysis = this.subredditsData.analysis

            //used in table
            this.subreddits = this.subredditsData.subreddits

            //loading data for the first chart
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie"
                })
            });

            //loading data for second chart
            this.subreddits.map((subreddit : Subreddit)=> {
                this.risersSplittedData[subreddit.name] = subreddit.analysis
            })
            
            this.data_title = `${this.subredditsData.n_entries} Registros`;
            
        }
        this.loading = false;
    }

    //default subreddits
    async getSubreddits(){
        const res : AxiosResponse<{subreddits: Array<Subreddit>, n_entries: number, analysis: Analysis}> = await axios.get("/reddit/subreddit");
        return res.data;
    }

    selectEvent() {
        this.$emit("selected-subreddit",this.tab)
    }

    //template subreddits loaded
    receivedSubredditsEvent() {
        this.init()
    }

}