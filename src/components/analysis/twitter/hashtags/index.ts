import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import FactorPie from "@/components/charts/FactorPie/index.vue"
import FactorEmo from '@/components/factors/index.vue'
import FileInput from '@/components/fileInput/index.vue'
import HsTable from '@/components/tables/twitter/HsTable/index.vue'
import { Hashtag, tfactor, Analysis } from '@/types';
import { SocialMedia, PostedHashtags } from '@/store'
import axios from '@/axios'
import { AxiosResponse } from 'axios'
@Component({
    components:{
        PieChart,
        FactorPie,
        FactorEmo,
        FileInput,
        HsTable
    }
})
export default class HashtagsAnalyzer extends Vue {
    tab: string = "tab-2"
    socialMedia : SocialMedia = "twitter"
    fileInputType : String =  "PostedHashtags"
    data_title = "Sin datos ";
    loading = false;
    
    hashtagsData! : PostedHashtags
    hashtags: Array<Hashtag> = []

    risersSplittedData : {[key: string] : Analysis} = {}
    titleOfEmotionalManifestation = "manifestación emocional por Hashtags"

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
        this.hashtagsData = this.$store.state.posted_data.twitter.hashtags_data

        //loading hashtags from store
        if( this.hashtagsData.n_entries != 0){
            this.data_title = "Cargando plantilla de datos "

            //used in emo-factor
            this.analysis = this.hashtagsData.analysis

            //used in table
            this.hashtags = this.hashtagsData.hashtags

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
            this.hashtags.map((hash : Hashtag) =>{
                this.risersSplittedData[hash.name] = hash.analysis
            })

            this.data_title = `${this.hashtagsData.n_entries} Registros`;


        //loading hashtags by default
        }else{
            this.data_title = "Cargando registros por defecto "

            //getting data from store
            this.hashtagsData = this.$store.state.default_data.twitter.hashtags_data

            if( this.hashtagsData.n_entries == 0){
                //getting data
                const {n_entries, hashtags, analysis} = await this.getHashtags()

                //updating data in store
                this.hashtagsData.n_entries = n_entries
                this.hashtagsData.hashtags = hashtags
                this.hashtagsData.analysis = analysis

                this.$store.commit("set_default_data", { 
                    SocialMedia : this.socialMedia, 
                    grouped: 1,
                    PostedHashtags : this.hashtagsData
                })
            }
            
            //used in emo-factor
            this.analysis = this.hashtagsData.analysis

            //used in table
            this.hashtags = this.hashtagsData.hashtags
            
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
            this.hashtags.map((hash : Hashtag) =>{
                this.risersSplittedData[hash.name] = hash.analysis
            })

            this.data_title = `${this.hashtagsData.n_entries} Registros`;

        }
        this.loading = false;
    }

    //default hashtags
    async getHashtags(){
        const res : AxiosResponse<{n_entries:number, hashtags: Array<Hashtag>, analysis: Analysis}> = await axios.get("/twitter/hashtags");
        return res.data;
    }

    selectEvent() {
        this.$emit("selected-hashtag",this.tab)
    }

    //template hashtags loaded
    receivedHashtagsEvent() {
        this.init()
    }

}