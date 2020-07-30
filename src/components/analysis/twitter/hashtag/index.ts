import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import Snackbar from '@/components/Snackbar/index.vue'
import TwTable from '@/components/tables/twitter/TwTable/index.vue'
import TwHashtagProfile from '@/components/profile/twitter/hashtag/index.vue'
import axios from '@/axios'
import { AxiosResponse } from 'axios';
import { Hashtag, tfactor, Tweet } from '@/types';

@Component({
    components:{
        PieChart,
        LineChart,
        FactorEmo,
        TwTable,
        Snackbar
    }
})

export default class HashtagAnalyzer extends Vue {
    search_input = "";
    voidTextFiel = true

    n_entries : number = 0;
    hashtag! : Hashtag

    twTable : Tweet[] = []
    pie_analysis : {name: string, y: number}[] = []
    analysis : {[key: string] : number} = {}
    
    topFiveAnalysis : {name:string; data: number[] }[] = []
    titleTop5 = "5 factores emocionales más representativos" 
    titleTop1= ""

    loading = false;
    enabledHashtag = false

    // translation
    menu_title = false;
    translated_title = ""

    changeKey : number = 0 
    snackbar: boolean | null = null

    data_title = "Sin datos ";
    
    mounted() {
        this.loadHashtag()  
        this.$vuetify.goTo(0,{
            duration: 0,
            offset: 0
        })
    }

    loadHashtag(){
        let dataHashtag = this.$store.state.twitter.fetched_hashtag
        if(dataHashtag.hashtag != undefined){
            this.n_entries = dataHashtag.n_entries
            this.hashtag = dataHashtag.hashtag
            this.pie_analysis = [];
            Object.keys(this.hashtag.analysis).map(key => {
                this.$set(this.analysis, key, this.hashtag.analysis[key]);
                if(this.hashtag){
                    this.pie_analysis.push({
                        name:tfactor[key],
                        y: this.hashtag.analysis[key]
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
            this.twTable = this.hashtag.tweets
            this.loading = false;
            this.enabledHashtag = true
            this.search_input = ""
            this.data_title = `${ this.n_entries} Registros`;
        }
    }
    async findHashtag(){
        this.voidTextFiel = true
        this.loading = true;
        const name = this.search_input;
        const res = await this.getHashtag(name);
        if(res != null){
            this.n_entries = res.n_entries
            this.hashtag = res.hashtag
            const payload = {
                n_entries: this.n_entries,
                hashtag: this.hashtag
            }
            this.$store.commit("set_twitter_hashtag" ,payload)
            Object.keys(this.hashtag.analysis).map(key => {
                this.$set(this.analysis, key, this.hashtag.analysis[key]);
                if(this.hashtag){
                    this.pie_analysis.push({
                        name:tfactor[key],
                        y: this.hashtag.analysis[key]
                    })
                }
            })
            this.twTable = this.hashtag.tweets
            this.enabledHashtag = true
        }
        this.loading = false;
        this.search_input = ""
       
    }

    async getHashtag(name: string){
        try {
            const res :AxiosResponse<{n_entries:number, hashtag: Hashtag}> = await axios.get("/twitter/hashtags/" + name);
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