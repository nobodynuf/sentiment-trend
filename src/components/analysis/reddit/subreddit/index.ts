import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import ColumnChart from "@/components/charts/ColumnChart/index.vue"
import FactorEmo from '@/components/factors/index.vue'
import Snackbar from '@/components/Snackbar/index.vue'
import SubTable from '@/components/tables/reddit/SubTable/index.vue'
import { Subreddit, RedditSub, tfactor } from '@/types';
import { AxiosResponse } from 'axios';
import VMarkdown from 'vue-markdown'
import axios from '@/axios'

@Component({
    components:{
        PieChart,
        ColumnChart,
        VMarkdown,
        FactorEmo,
        SubTable,
        Snackbar
    }
})
export default class SubredditAnalyzer extends Vue {
    search_input = "";
    voidTextFiel = true

    data_title = "Sin datos";
    loading = false;
    enabledSub = false

    subredditData! :  {subreddit: Subreddit, n_entries: number}
    subreddit! : Subreddit
    submissionsTable : RedditSub[] = []

    sub_analysis : {[key: string] : number} = {}

    pie_analysis : {name: string, y: number}[] = []

    topFiveAnalysis : {name:string; data: number[] }[] = []
    titleTop5 = "5 factores emocionales más representativos" 
    titleTop1= ""

    changingKeySnackbar : number = 0 
    snackbar: boolean | null = null
    
    mounted() {
        this.$vuetify.goTo(0,{
            duration: 0,
            offset: 0
        })

        this.loadSubreddit()
    }

    loadSubreddit(){

        //getting data from store
        this.subredditData = this.$store.state.reddit.fetched_subreddit

        //loading data from store
        if(this.subredditData.subreddit != undefined){

            //used in profile
            this.subreddit = this.subredditData.subreddit

            //used in emo-factor
            this.sub_analysis =  this.subredditData.subreddit.analysis

            //used in table
            this.submissionsTable = this.subredditData.subreddit.submissions

            this.pie_analysis = [];
            this.topFiveAnalysis = []
            Object.keys(this.sub_analysis).map(key => {

                //loading data for the first chart
                this.pie_analysis.push({
                    name: tfactor[key],
                    y: this.sub_analysis[key]
                })

                //loading data for second chart
                this.topFiveAnalysis.push({
                    name: tfactor[key],
                    data: [Math.ceil(this.sub_analysis[key])]
                })
                this.topFiveAnalysis = this.topFiveAnalysis.sort(((a, b) =>  b.data[0] - a.data[0])).slice(0,5)
                var top1 = this.topFiveAnalysis[0].name
                this.titleTop1 = ` '${top1}" es el factor con mayor manifestación emocional`
            })
            
            this.enabledSub = true
            this.data_title = `${ this.subredditData.n_entries} Registros`;
        }
    }

    async findSubreddit(){
        this.voidTextFiel = true
        this.loading = true;
        const name = this.search_input;

        //getting data
        const subredditData = await this.getSubreddit(name);

        if(subredditData != null){

            //updating data in store
            this.$store.commit("set_reddit_subreddit" , subredditData)

            this.loadSubreddit()

        }
        this.loading = false;
        this.search_input = ""
    }

    async getSubreddit(name: string){
        try {
            const res : AxiosResponse<{subreddit: Subreddit, n_entries: number}> = await axios.get("/reddit/subreddit/" + name);
            this.changingKeySnackbar ++
            this.snackbar = true
            return res.data;
        } catch{
            this.changingKeySnackbar ++
            this.snackbar = false
            return null 
        }
    }

    onSearchChange() {
        if(this.search_input == "" || this.loading == true){
            this.voidTextFiel = true
        }else{
            this.voidTextFiel = false
            this.$set(this.topFiveAnalysis, 'topFiveAnalysis', this.topFiveAnalysis)
        }
    }
}