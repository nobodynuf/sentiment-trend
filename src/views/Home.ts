import {Component, Vue, Watch} from "vue-property-decorator"
import PieChart from "../components/charts/PieChart/index.vue"
import LineChart from "../components/charts/LineChart/index.vue"
import ColumnChart from "../components/charts/ColumnChart/index.vue"
import FactorChart from '../components/charts/FactorBar/index.vue'
import FileInput from '@/components/fileInput/index.vue'
import axios from '@/axios'
import { Subreddit, Analysis, tfactor } from '@/types'
import { AxiosResponse } from 'axios'
import { $debug } from '@/utils'
import { PostedSubreddits, PostedRedditUsers } from '@/store'
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
    
    fileInputType : String =  "PostedSubreddits"

    redditTemplateDataDisabled : boolean = true

    subreddit_split_data : {[key: string] : Analysis} = {}
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
        //getting data from the template
        const subredditsTemplateData = this.$store.state.posted_data.reddit.subreddits_data
        if( subredditsTemplateData.n_entries != 0 ){
            this.reddit(subredditsTemplateData)
            this.toggle_reddit = 1
            this.redditTemplateDataDisabled = false

        }else{
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
            this.reddit(subredditsDefaultData)
        }

        
    }

    async getSubreddits(){
        const res: AxiosResponse<PostedSubreddits> = await axios.get("/reddit/subreddit");
        return res.data;
    }

    async getRedditUsers(){
        const res: AxiosResponse<PostedRedditUsers> = await axios.get("/reddit/user");
        return res.data;
    }


    @Watch("toggle_reddit")
    onChangeReddit(){
        let subredditsData
        if(this.toggle_reddit == 0){
            subredditsData = this.$store.state.default_data.reddit.subreddits_data
        }
        else if(this.toggle_reddit == 1){
            subredditsData = this.$store.state.posted_data.reddit.subreddits_data
        }
        this.reddit(subredditsData)
        this.redditEntries = subredditsData.n_entries;
        this.redditTitle = `${this.redditEntries} Registros`;
    }

    receivedSubredditsEvent() {
        this.init()
    }

    reddit(data: PostedSubreddits){
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
}

