import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import Snackbar from '@/components/Snackbar/index.vue'
import TwTable from '@/components/tables/twitter/TwTable/index.vue'
import axios from '@/axios'
import { TwitterUser, tfactor, Tweet } from '@/types';
import { AxiosResponse } from 'axios';

@Component({
    components:{
        PieChart,
        LineChart,
        FactorEmo,
        TwTable,
        Snackbar
    }
})
export default class UserAnalyzer extends Vue {
    
    search_input = "";
    voidTextFiel = true

    loading = false;
    enabledUser = false

    n_entries : number = 0;
    user! : TwitterUser

    twTable : Tweet[] = []
    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number}[] = []

    topFiveAnalysis : {name:string; data: number[] }[] = []
    titleTop5 = "5 factores emocionales más representativos" 
    titleTop1= ""

    changeKey : number = 0 
    snackbar: boolean | null = null

    data_title = "Sin datos ";

    mounted() {
        this.loadUser()
        this.$vuetify.goTo(0,{
            duration: 0,
            offset: 0
        })
    }

    loadUser(){
        let dataUser = this.$store.state.twitter.fetched_user
        if(dataUser.user != undefined){
            this.n_entries = dataUser.n_entries
            this.user = dataUser.user
            this.pie_analysis = [];
            Object.keys(this.user.analysis).map(key => {
                this.$set(this.analysis, key, this.user.analysis[key]);
                if(this.user){
                    this.pie_analysis.push({
                        name:tfactor[key],
                        y: this.user.analysis[key]
                    })
                    this.topFiveAnalysis.push({
                        name: tfactor[key],
                        data: [Math.ceil(this.analysis[key])]
                    })
                    this.topFiveAnalysis = this.topFiveAnalysis.sort(((a, b) =>  b.data[0] - a.data[0])).slice(0,5)
                    var top1 = this.topFiveAnalysis[0].name
                    this.titleTop1 = ` '${top1}" es el factor con mayor manifestación emocional`
                }
            })
            this.twTable = this.user.tweets
            this.loading = false;
            this.enabledUser = true
            this.data_title = `${ this.n_entries} Registros`;
        }
    }

    async findUser(){
        this.voidTextFiel = true
        this.loading = true;
        const name = this.search_input;
        const res = await this.getUser(name);
        if( res != null){
            this.n_entries = res.n_entries
            this.user = res.user
            const payload = {
                n_entries: this.n_entries,
                user: this.user
            }
            this.$store.commit("set_twitter_user" ,payload)
            Object.keys(this.user.analysis).map(key => {
                this.$set(this.analysis, key, this.user.analysis[key]);
                if(this.user){
                    this.pie_analysis.push({
                        name:tfactor[key],
                        y: this.user.analysis[key]
                    })
                }
            })
            this.twTable = this.user.tweets
            this.enabledUser = true    
        }
        this.loading = false;
        this.search_input = ""
       
    }

    async getUser(name: string){
        try {
            const res :AxiosResponse<{n_entries:number, user: TwitterUser}> = await axios.get("/twitter/user/" + name);
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
        }
    }
}