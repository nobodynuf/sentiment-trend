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

    hashtagsData! : PostedHashtags
    hashtags: Array<Hashtag> = []

    risersSplittedData : {[key: string] : Analysis} = {}
    titleOfEmotionalManifestation = "manifestación emocional por Hashtags"

    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number, value: number, type: string}[] = []
    
    loading = false;
    data_title = "Sin datos...";

    mounted() {
        this.init()
    }

    async init(){
        this.loading = true;
        this.hashtagsData = this.$store.state.posted_data.twitter.hashtags_data


        //loading hashtags from store
        if( this.hashtagsData.n_entries != 0){
            this.hashtags = this.hashtagsData.hashtags;
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie"
                })
            });
            this.risersSplittedData = {}
            this.hashtags.map((hash : Hashtag) =>{
                this.risersSplittedData[hash.name] = hash.analysis
            })
            this.$set(this.hashtags, "hashtags", this.hashtags)
            this.data_title = `${this.hashtagsData.n_entries} Registros`;


        //loading hashtags by default
        }else{
            this.data_title = "Cargando registros por defecto..."
            const {n_entries, hashtags, analysis} = await this.getHashtags()
            this.hashtagsData.hashtags = hashtags
            this.hashtagsData.n_entries = n_entries
            this.hashtagsData.analysis = analysis
            this.hashtags = hashtags;
            this.risersSplittedData = {}
            this.hashtags.map((hash : Hashtag) =>{
                this.risersSplittedData[hash.name] = hash.analysis
            })
            Object.keys(this.hashtags[0].analysis).map(key => {
                this.$set(this.analysis, key, 0);
            })

            Object.keys(this.analysis).map(key => {
                let div = this.analysis[key]/this.hashtags.length;
                this.$set(this.analysis, key, div);
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie"
                })
            });
            this.data_title = `${this.hashtagsData.n_entries} Registros`;
        }
        
        this.loading = false;
    }

    //default hashtags
    async getHashtags(){
            const res :AxiosResponse<{n_entries:number, hashtags: Array<Hashtag>, analysis: Analysis}> = await axios.get("/twitter/hashtags");
            return res.data;
    }

    selectEvent() {
        this.$emit("selected-hashtag",this.tab)
    }

    //template hashtags loaded
    receivedHashtagsEvent($event :{ hashtags : Array<Hashtag>, n_entries : number, analysis: Analysis }) {
        this.hashtagsData.n_entries = $event.n_entries
        this.hashtagsData.hashtags = $event.hashtags
        this.hashtagsData.analysis = $event.analysis
        this.$store.commit("set_posted_data", { SocialMedia : this.socialMedia, PostedHashtags : this.hashtagsData} )
        this.init()
    }

}