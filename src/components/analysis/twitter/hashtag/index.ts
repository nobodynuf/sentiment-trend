import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import ColumnChart from "@/components/charts/ColumnChart/index.vue"
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
        ColumnChart,
        FactorEmo,
        TwTable,
        Snackbar
    }
})

export default class HashtagAnalyzer extends Vue {
    search_input = "";
    voidTextFiel = true
    carouselItem = 0

    data_title = "Sin datos ";
    loading = false;
    enabledHashtag = false

    hashtagData! :  {hashtag: Hashtag, n_entries: number}
    hashtag! : Hashtag
    twTable : Tweet[] = []

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

        this.loadHashtag()  
    }

    loadHashtag(){

        //getting data from store
        this.hashtagData = this.$store.state.twitter.fetched_hashtag
        
        //loading data from store
        if(this.hashtagData.hashtag != undefined){

            //used in profile
            this.hashtag = this.hashtagData.hashtag

            //used in emo-factor
            this.analysis = this.hashtagData.hashtag.analysis
            
            //used in table
            this.twTable = this.hashtagData.hashtag.tweets

            this.pie_analysis = [];
            this.topFiveAnalysis = []
            Object.keys(this.analysis).map(key => {

                //loading data for the first chart
                this.pie_analysis.push({
                    name:tfactor[key],
                    y: this.analysis[key]
                })

                //loading data for second chart
                this.topFiveAnalysis.push({
                    name: tfactor[key],
                    data: [Math.ceil(this.analysis[key])]
                })
                this.topFiveAnalysis = this.topFiveAnalysis.sort(((a, b) =>  b.data[0] - a.data[0])).slice(0,5)
                var top1 = this.topFiveAnalysis[0].name
                this.titleTop1 = `${top1} es el factor con mayor manifestación emocional`
                
            })
            
            this.enabledHashtag = true
            this.data_title = `${this.hashtag.n_entries} Registros`;
        }
    }
    async findHashtag(){
        this.voidTextFiel = true
        this.loading = true;
        const name = this.search_input;

        //getting data
        const hashtagData = await this.getHashtag(name);

        if(hashtagData != null){

            //updating data in store
            this.hashtagData.hashtag = hashtagData
            this.hashtagData.n_entries = hashtagData.n_entries
            this.$store.commit("set_twitter_hashtag", this.hashtagData);

            this.loadHashtag()
        }
        this.loading = false;
        this.search_input = ""
       
    }

    async getHashtag(name: string){
        try {
            const res :AxiosResponse<Hashtag> = await axios.get("/twitter/hashtags/" + name);
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

    //chart data update Top Five
    @Watch("carouselItem")
    onChangeCarouselItem() {
        if(this.carouselItem == 1){
            setTimeout(this.updatingDataTopFive,1)
        }
    }
    updatingDataTopFive() {
        this.$set(this.topFiveAnalysis, 'topFiveAnalysis', this.topFiveAnalysis)
    }
}