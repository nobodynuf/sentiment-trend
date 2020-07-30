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
    
    subreddit! : Subreddit
    n_entries : number = 0;
    enabledSub = false

    changeKey : number = 0 
    snackbar: boolean | null = null

    topFiveAnalysis : {name:string; data: number[] }[] = []
    titleTop5 = "5 factores emocionales más representativos" 
    titleTop1= ""

    submissionsTable : RedditSub[] = []
    sub_analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number}[] = []
    loading = false;

    // translation
    menu_title = false;
    translated_title = ""

    menu_body = false;
    translated_body = "";
    
    data_title = "Sin datos";
    
    mounted() {
        this.loadSubreddit()
        this.$vuetify.goTo(0,{
            duration: 0,
            offset: 0
        })
    }

    loadSubreddit(){
        let dataSubreddit = this.$store.state.reddit.fetched_subreddit.subreddit
        if(dataSubreddit != undefined){
            this.subreddit = dataSubreddit
            this.n_entries = this.subreddit.n_entries;
            this.pie_analysis = [];
            Object.keys(this.subreddit.analysis).map(key => {
                if(this.subreddit){
                    this.pie_analysis.push({
                        name: tfactor[key],
                        y: this.subreddit.analysis[key]
                    })
                    this.topFiveAnalysis.push({
                        name: tfactor[key],
                        data: [Math.ceil(this.subreddit.analysis[key])]
                    })
                    this.topFiveAnalysis = this.topFiveAnalysis.sort(((a, b) =>  b.data[0] - a.data[0])).slice(0,5)
                    var top1 = this.topFiveAnalysis[0].name
                    this.titleTop1 = ` '${top1}" es el factor con mayor manifestación emocional`
                }
            })
            this.sub_analysis =  this.subreddit.analysis
            this.submissionsTable = this.subreddit.submissions
            this.enabledSub = true
            this.data_title = `${ this.n_entries} Registros`;
        }
    }

    async findSubreddit(){
        this.voidTextFiel = true
        this.loading = true;
        const name = this.search_input;
        const res = await this.getSubreddit(name);
        if(res != null){
            this.subreddit = res;
            const payload = {
                n_entries: res.n_entries,
                subreddit: res
            }
            this.$store.commit("set_reddit_subreddit" ,payload)
            this.n_entries = res.n_entries;
            this.pie_analysis = [];
            Object.keys(this.subreddit.analysis).map(key => {
                if(this.subreddit){
                    this.pie_analysis.push({
                        name:tfactor[key],
                        y: this.subreddit.analysis[key]
                    })
                }
            })
            this.sub_analysis =  this.subreddit.analysis
            this.submissionsTable = this.subreddit.submissions
            this.enabledSub = true
        }
        this.loading = false;
        this.search_input = ""
    }

    async getSubreddit(name: string){
        try {
        const res : AxiosResponse<{subreddit: Subreddit}> = await axios.get("/reddit/subreddit/" + name);
        this.changeKey ++
        this.snackbar = true
        return res.data.subreddit;
        } catch{
            this.changeKey ++
            this.snackbar = false
            return null 

        }
    }

    async translate_title(text: string){
        this.menu_title = true;
        this.translated_title = await this.getTranslation(text)
    }

    async translate_body(text: string){
        this.menu_body = true;
        this.translated_body = await this.getTranslation(text)
    }

    async getTranslation(text: string){
        const res: AxiosResponse<{translation: string}> = await axios.post("/translate", {text});
        return res.data.translation
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