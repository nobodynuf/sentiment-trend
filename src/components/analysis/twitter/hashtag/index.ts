import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import TwTable from '@/components/tables/twitter/TwTable/index.vue'
import TwHashtagProfile from '@/components/profile/twitter/hashtag/index.vue'
import axios from '@/axios'
import { AxiosResponse } from 'axios';
import { Hashtag, tfactor } from '@/types';

@Component({
    components:{
        PieChart,
        LineChart,
        FactorEmo,
        TwTable
    }
})

export default class HashtagAnalyzer extends Vue {
    search_input = "";
    voidTextFiel = false

    n_entries : number = 0;
    hashtag! : Hashtag

    pie_analysis : {name: string, y: number}[] = []
    analysis : {[key: string] : number} = {}
    
    loading = false;
    enabledHashtag = false

    // translation
    menu_title = false;
    translated_title = ""

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
                }
            })
            this.$set(this.hashtag, "tweets", this.hashtag.tweets);
            this.loading = false;
            this.enabledHashtag = true
            this.search_input = ""
        }
    }
    async findHashtag(){
        this.voidTextFiel = true
        this.loading = true;
        const name = this.search_input;
        const res = await this.getHashtag(name);
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
        this.$set(this.hashtag, "tweets", this.hashtag.tweets);
        this.loading = false;
        this.enabledHashtag = true
        this.search_input = ""
    }

    async getHashtag(name: string){
        const res :AxiosResponse<{n_entries:number, hashtag: Hashtag}> = await axios.get("/twitter/hashtags/" + name);
        return res.data;
    }

    onSearchChange() {
        if(this.search_input == "" || this.loading == true){
            this.voidTextFiel = true
        }else{
            this.voidTextFiel = false
        }
    }
}