import {Component, Vue, Watch} from "vue-property-decorator"
import PieChart from "../components/charts/PieChart/index.vue"
import LineChart from "../components/charts/LineChart/index.vue"
import ColumnChart from "../components/charts/ColumnChart/index.vue"
import FactorChart from '../components/charts/FactorBar/index.vue'
import FileInput from '@/components/fileInput/index.vue'
import axios from '@/axios'
import { Subreddit, Analysis, tfactor, Hashtag } from '@/types'
import { AxiosResponse } from 'axios'
import { $debug } from '@/utils'
import { PostedSubreddits, PostedHashtags } from '@/store'
import SubredditsAnalyzer from '@/components/analysis/reddit/subreddits'

@Component({
    components: {
        PieChart,
        LineChart,
        ColumnChart,
        FactorChart,
        FileInput
    },
})
export default class HomeView extends Vue {

    toggle_twitter = 0
    toggle_reddit = 0
    
    fileInputType : String =  "home"

    redditTemplateDataDisabled : boolean = true
    twitterTemplateDataDisabled : boolean = true

    subreddit_split_data : {[key: string] : Analysis} = {}
    hashtag_split_data : {[key: string] : Analysis} = {}

    subreddit_pie_analysis : {name: string, y: number, value: number, type: string}[] = []
    hashtag_pie_analysis : {name: string, y: number, value: number, type: string}[] = []

    redditTitle = ""
    twitterTitle = ""

    redditEntries = 0
    twitterEntries = 0

    mounted(){
        this.init();
    }

    async init(){
        await this.reddit()
        await this.twitter()
    }


    //reddit
    @Watch("toggle_reddit")
    onChangeReddit(){
        let subredditsData
        if(this.toggle_reddit == 0){
            subredditsData = this.$store.state.default_data.reddit.subreddits_data
        }
        else if(this.toggle_reddit == 1){
            subredditsData = this.$store.state.posted_data.reddit.subreddits_data
        }
        this.changingDataOnReddit(subredditsData)
        this.redditEntries = subredditsData.n_entries;
        this.redditTitle = `${this.redditEntries} Registros`;
    }

    async reddit(){
        //getting data from the template
        const subredditsTemplateData = this.$store.state.posted_data.reddit.subreddits_data
        if( subredditsTemplateData.n_entries != 0 ){
            this.changingDataOnReddit(subredditsTemplateData)
            this.toggle_reddit = 1
            this.redditTemplateDataDisabled = false
        }else {
            this.toggle_reddit = 0
            //getting default data from store
            let subredditsDefaultData = this.$store.state.default_data.reddit.subreddits_data
            
            //setting default data to store
            if(subredditsDefaultData.n_entries == 0){
                const promises: Array<Promise<any>> = [
                    this.getSubreddits(),
                ]
                const data = await Promise.all(promises);
                this.$store.commit("set_default_data", {social: "reddit", grouped: 1, data: data[0]});
                subredditsDefaultData = this.$store.state.default_data.reddit.subreddits_data
            }
            this.changingDataOnReddit(subredditsDefaultData)
        }
    }

    changingDataOnReddit(data: PostedSubreddits){
        this.subreddit_split_data = {}
        this.subreddit_pie_analysis = []

        this.redditEntries = data.n_entries;
        this.redditTitle = `${this.redditEntries} Registros`;

        data.subreddits.map((sub: Subreddit) => {
            this.subreddit_split_data[sub.name] = sub.analysis;
        })
        
        Object.keys(data.analysis).map(key => {
            this.subreddit_pie_analysis.push({
                name: tfactor[key],
                value: data.analysis[key],
                y: data.analysis[key],
                type: "pie"
            })
        });
    }
    async getSubreddits(){
        const res: AxiosResponse<PostedSubreddits> = await axios.get("/reddit/subreddit");
        return res.data;
    }


    //twitter
    @Watch("toggle_twitter")
    onChangeTwitter(){
        let hashtagsData
        if(this.toggle_twitter == 0){
            hashtagsData = this.$store.state.default_data.twitter.hashtags_data
        }
        else if(this.toggle_twitter == 1){
            hashtagsData = this.$store.state.posted_data.twitter.hashtags_data
        }
        this.changingDataOnTwitter(hashtagsData)
        this.twitterEntries = hashtagsData.n_entries;
        this.twitterTitle = `${this.twitterEntries} Registros`;
    }

    async twitter(){
        //getting data from the template
        const hashtagsTemplateData = this.$store.state.posted_data.twitter.hashtags_data
        if( hashtagsTemplateData.n_entries != 0 ){
            this.changingDataOnTwitter(hashtagsTemplateData)
            this.toggle_twitter = 1
            this.twitterTemplateDataDisabled = false
        }else {
            this.toggle_twitter = 0
            //getting default data from store
            let hashtagsDefaultData = this.$store.state.default_data.twitter.hashtags_data
            
            //setting default data to store
            if(hashtagsDefaultData.n_entries == 0){
                const promises: Array<Promise<any>> = [
                    this.getHashtags(),
                ]
                const data = await Promise.all(promises);
                this.$store.commit("set_default_data", {social: "twitter", grouped: 1, data: data[0]});
                hashtagsDefaultData = this.$store.state.default_data.twitter.hashtags_data
            }
            this.changingDataOnTwitter(hashtagsDefaultData)
        }
    }

    changingDataOnTwitter(data: PostedHashtags){
        this.hashtag_split_data = {}
        this.hashtag_pie_analysis = []

        this.twitterEntries = data.n_entries;
        this.twitterTitle = `${this.twitterEntries} Registros`;

        data.hashtags.map((hash: Hashtag) => {
            this.hashtag_split_data[hash.name] = hash.analysis;
        })
        
        Object.keys(data.analysis).map(key => {
            this.hashtag_pie_analysis.push({
                name: tfactor[key],
                value: data.analysis[key],
                y: data.analysis[key],
                type: "pie"
            })
        });
    }

    async getHashtags(){
        const res: AxiosResponse<PostedHashtags> = await axios.get("/twitter/hashtags");
        return res.data;
    }


    receivedHomeEvent() {
        this.init()
    }
}

