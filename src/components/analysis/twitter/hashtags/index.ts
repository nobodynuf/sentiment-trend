import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import FileInput from '@/components/fileInput/index.vue'
import HsTable from '@/components/tables/twitter/HsTable/index.vue'
import { Hashtag, tfactor } from '@/types';
import { SocialMedia, PostedHashtags } from '@/store'
import axios from '@/axios'
import { AxiosResponse } from 'axios'
@Component({
    components:{
        PieChart,
        LineChart,
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

    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number, value: number, type: string}[] = []

    file_endpoint = "/twitter/hashtags";
    
    loading = false;
    enabledHashtag = false
    data_title = "Sin datos...";
    num : number = 0 

    mounted() {
        this.init()
    }

    async init(){
        this.loading = true;
        this.hashtagsData = this.$store.state.posted_data.twitter.hashtags_data
        if( this.hashtagsData.n_entries != 0){
            this.hashtags = this.hashtagsData.hashtags;
            let total = 0
            Object.keys(this.hashtags[0].analysis).map(key => {
                this.$set(this.analysis, key, 0);
            })
            this.hashtags.map(hashtag => {
                Object.keys(hashtag.analysis).map(key => {
                    let sum = this.analysis[key] + hashtag.analysis[key];
                    this.$set(this.analysis, key, sum);
                    total += hashtag.analysis[key];
                });
            })
            
            Object.keys(this.analysis).map(key => {
                let div = this.analysis[key]/this.hashtags.length;
                this.$set(this.analysis, key, div);
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key]*100/total,
                    type: "pie"
                })
            });
            this.$set(this.hashtags, "hashtags", this.hashtags)
            this.data_title = `${this.hashtagsData.n_entries} Registros`;
            this.num++
        }else{
            this.data_title = "Cargando registros por defecto..."
            const {n_entries, hashtags} = await this.getHashtags()
            
            this.hashtagsData.hashtags = hashtags
            this.hashtagsData.n_entries = n_entries
            this.$store.commit("set_posted_data", { SocialMedia : this.socialMedia, hashtags_data : this.hashtagsData} );
            let total = 0
            this.hashtags = hashtags;
            Object.keys(this.hashtags[0].analysis).map(key => {
                this.$set(this.analysis, key, 0);
            })
            this.hashtags.map(hashtag => {
                Object.keys(hashtag.analysis).map(key => {
                    let sum = this.analysis[key] + hashtag.analysis[key];
                    this.$set(this.analysis, key, sum);
                    total += hashtag.analysis[key];
                });
            })
            
            Object.keys(this.analysis).map(key => {
                let div = this.analysis[key]/this.hashtags.length;
                this.$set(this.analysis, key, div);
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key]*100/total,
                    type: "pie"
                })
            });

            this.data_title = `${this.hashtagsData.n_entries} Registros`;
        }
        
        this.loading = false;
        this.enabledHashtag = true
    }

    async getHashtags(){
        const res :AxiosResponse<{n_entries:number, hashtags: Array<Hashtag>}> = await axios.get("/twitter/hashtags");
        return res.data;
    }

    selectEvent() {
        this.$emit("selected-hashtag",this.tab)
    }

    receivedHashtagsEvent($event :{ hashtags : Array<Hashtag>, n_entries : number }) {
        this.hashtagsData.n_entries = $event.n_entries
        this.hashtagsData.hashtags = $event.hashtags
        this.$store.commit("set_posted_data", { SocialMedia : this.socialMedia, PostedHashtags : this.hashtagsData} )
        this.init()
    }

}