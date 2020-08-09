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

    data_title = "Sin datos";
    loading = false;
    enabledUser = false
    
    userData! :  {user: RedditUser, n_entries: number}
    user! :RedditUser
    submissionsTable : RedditSub[] = []

    analysis : {[key: string] : number} = {}

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

        this.loadUser()
    }

    loadUser() {

        //getting data from store
        this.userData = this.$store.state.reddit.fetched_user

        //loading data from store
        if(this.userData.user != undefined){

            //used in profile
            this.user = this.userData.user
            
            //used in emo-factor
            this.analysis = this.userData.user.analysis

            //used in table
            this.submissionsTable = this.userData.user.submissions

            this.pie_analysis = [];
            this.topFiveAnalysis = []
            Object.keys(this.analysis).map(key => {

                    //loading data for the first chart
                    this.pie_analysis.push({
                        name: tfactor[key],
                        y: this.analysis[key]
                    })

                    //loading data for second chart
                    this.topFiveAnalysis.push({
                        name: tfactor[key],
                        data: [Math.ceil(this.analysis[key])]
                    })
                    this.topFiveAnalysis = this.topFiveAnalysis.sort(((a, b) =>  b.data[0] - a.data[0])).slice(0,5)
                    var top1 = this.topFiveAnalysis[0].name
                    this.titleTop1 = ` '${top1}" es el factor con mayor manifestación emocional`
            })

            this.enabledUser = true
            this.data_title = `${this.userData.n_entries} Registros`;
        }
    }

    async findUser(){
        this.voidTextFiel = true
        this.loading = true;
        const name = this.search_input;

        //getting data
        const userData = await this.getUser(name);

        if(userData != null){

            //updating data in store
            this.$store.commit("set_reddit_user", userData);

            this.loadUser()
        }

        this.loading = false;
        this.search_input = "" 
    }

    async getUser(name: string){
        try {
            const res : AxiosResponse<{user: RedditUser, n_entries: number}>= await axios.get("/reddit/user/" + name);
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