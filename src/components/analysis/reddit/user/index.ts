import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import ColumnChart from "@/components/charts/ColumnChart/index.vue"
import FactorEmo from '@/components/factors/index.vue'
import Snackbar from '@/components/Snackbar/index.vue'
import SubTable from '@/components/tables/reddit/SubTable/index.vue'
import { RedditUser, Subreddit, Analysis, RedditSub, tfactor } from '@/types';
import { AxiosResponse } from 'axios';
import axios from '@/axios'


@Component({
    components:{
        PieChart,
        ColumnChart,
        FactorEmo,
        SubTable,
        Snackbar
    }
})
export default class UserAnalyzer extends Vue {
    search_input = "";
    voidTextFiel = true

    pie_analysis : {name: string, y: number}[] = []
    
    topFiveAnalysis : {name:string; data: number[] }[] = []
    titleTop5 = "5 factores emocionales más representativos" 
    titleTop1= ""

    iconImg :string = ""
    n_entries : number = 0
    loading = false;
    user! :RedditUser
    
    analysis : {[key: string] : number} = {}
    submissions:RedditSub[] | undefined
    submissionsTable : RedditSub[] = []
    enabledUser = false
    
    changeKey : number = 0 
    snackbar: boolean | null = null

    data_title = "Sin datos";

    mounted() {
        this.loadUser()
        this.$vuetify.goTo(0,{
            duration: 0,
            offset: 0
        })
    }

   
//factor emocional con mayor manifestacion es
    loadUser() {
        let dataUser = this.$store.state.reddit.fetched_user.user
        if(dataUser != undefined){
            this.user = dataUser
            this.submissionsTable = this.user.submissions
            this.analysis = this.user.analysis
            this.iconImg = this.user.icon_img
            this.pie_analysis = [];
            Object.keys(this.analysis).map(key => {
                    this.pie_analysis.push({
                        name: tfactor[key],
                        y: this.analysis[key]
                    })
                    this.topFiveAnalysis.push({
                        name: tfactor[key],
                        data: [Math.ceil(this.analysis[key])]
                    })
                    this.topFiveAnalysis = this.topFiveAnalysis.sort(((a, b) =>  b.data[0] - a.data[0])).slice(0,5)
                    var top1 = this.topFiveAnalysis[0].name
                    this.titleTop1 = ` '${top1}" es el factor con mayor manifestación emocional`
            })
            this.enabledUser = true
            this.data_title = `${ this.user.n_entries} Registros`;
        }
    }

    async findUser(){
        this.voidTextFiel = true
        this.loading = true;
        const name = this.search_input;
        const userData = await this.getUser(name);
        if(userData != null){
            this.n_entries = userData.user.n_entries;
            this.user = userData.user;
            this.$store.commit("set_reddit_user", userData);

            this.submissionsTable = this.user.submissions
            this.analysis = this.user.analysis
            this.iconImg = this.user.icon_img
            this.pie_analysis = [];
            Object.keys(this.user.analysis).map(key => {
                if(this.user){
                    this.pie_analysis.push({
                        name:tfactor[key],
                        y: this.user.analysis[key]
                    })
                }
            })
            this.enabledUser = true
        }
        this.loading = false;
        this.search_input = "" 
    }

    async getUser(name: string){
        try {
            const res : AxiosResponse<{user: RedditUser, n_entries: number}>= await axios.get("/reddit/user/" + name);
            this.changeKey ++
            this.snackbar = true
            return res.data;   
        } catch{
            this.changeKey ++
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