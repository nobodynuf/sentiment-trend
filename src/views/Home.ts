import {Component, Vue, Watch} from "vue-property-decorator"
import PieChart from "../components/charts/PieChart/index.vue"
import LineChart from "../components/charts/LineChart/index.vue"
import ColumnChart from "../components/charts/ColumnChart/index.vue"
import FactorChart from '../components/charts/FactorBar/index.vue'
import axios from '@/axios'
import { Subreddit, Analysis, RedditUser } from '@/types'
import { AxiosResponse } from 'axios'
import { $debug } from '@/utils'
import { PostedSubreddits, PostedRedditUsers } from '@/store'
import SubredditsAnalyzer from '@/components/analysis/reddit/subreddits'

@Component({
    components: {
        PieChart,
        LineChart,
        ColumnChart,
        FactorChart
    },
})
export default class HomeView extends Vue {

    toggle_twitter = 0
    toggle_reddit = 0

    //default data
    subredditsDefaultData! : PostedSubreddits
    rUsersDefaultData!: PostedRedditUsers

    //template data
    subredditsTemplateData! : PostedSubreddits
    rUsersTemplateData!: PostedRedditUsers

    redditTemplateDataDisabled : boolean = true

    rusers_splited_data : {[key: string] : Analysis} = {}
    subreddit_default_split_data : {[key: string] : Analysis} = {}
    
    entries = {
        default: {
            reddit: {
                subreddit: 0,
                users: 0
            },
            twitter:{
                hashtag:0,
                users: 0
            }
        },
        template: {
            reddit: {
                subreddit: 0,
                users: 0
            },
            twitter: {
                hashtag:0,
                users: 0
            }
        }
    };

    mounted(){
        this.init();
    }

    async init(){
        //getting data from store
        this.subredditsTemplateData = this.$store.state.posted_data.reddit.subreddits_data
        if(this.subredditsTemplateData.n_entries != 0  ){
            this.redditTemplateDataDisabled = false
        }

        this.subredditsDefaultData = this.$store.state.default_data.reddit.subreddits_data
        this.rUsersDefaultData = this.$store.state.default_data.reddit.users_data
        
        if(this.subredditsDefaultData.n_entries == 0){
            const promises: Array<Promise<any>> = [
                this.getRedditUsers(),
                this.getSubreddits(),
            ]

            const data = await Promise.all(promises);
            //const reddit_users = data[0]
            //const subreddits = data[1]
            
            this.$store.commit("set_default_data", {social: "reddit", grouped: 0, data: data[0]});
            
            //this.entries.default.reddit.users = data[0].n_entries;
            this.$store.commit("set_default_data", {social: "reddit", grouped: 1, data: data[1]});
            
            //this.entries.default.reddit.subreddit = data[1].n_entries;
            this.subredditsDefaultData = this.$store.state.default_data.reddit.subreddits_data
            this.rUsersDefaultData = this.$store.state.default_data.reddit.users_data
        }
        this.entries.default.reddit.subreddit = this.subredditsDefaultData.n_entries;
        this.entries.default.reddit.users = this.rUsersDefaultData.n_entries;


        this.subredditsDefaultData.subreddits.map((sub: Subreddit) => {
            this.subreddit_default_split_data[sub.name] = sub.analysis;
        })

        this.rUsersDefaultData.users.map((user: RedditUser) => {
            this.rusers_splited_data[user.name] = user.analysis;
        })
        
        
        
        
        
        
    }

    async getSubreddits(){
        const res: AxiosResponse<PostedSubreddits> = await axios.get("/reddit/subreddit");
        return res.data;
    }

    async getRedditUsers(){
        const res: AxiosResponse<PostedRedditUsers> = await axios.get("/reddit/user");
        return res.data;
    }

}
