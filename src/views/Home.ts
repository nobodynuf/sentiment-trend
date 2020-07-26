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

    mounted(){
        this.init();
    }

    rusers_splited_data : {[key: string] : Analysis} = {}
    subreddit_splited_data : {[key: string] : Analysis} = {}
    entries = {
        default: {
            reddit: {
                subreddit: 0,
                users: 0
            }
        }
    };

    async init(){
        const promises: Array<Promise<any>> = [
            this.getRedditUsers(),
            this.getSubreddits(),
        ]
        const data = await Promise.all(promises);
        const reddit_users = data[0]
        const subreddits = data[1]
        this.$store.commit("set_default_data", {social: "reddit", grouped: 0, data: data[0]});
        this.$store.state.default_data.reddit.users_data.users.map((user: RedditUser) => {
            this.rusers_splited_data[user.name] = user.analysis;
        })
        this.entries.default.reddit.users = data[0].n_entries;
        this.$store.commit("set_default_data", {social: "reddit", grouped: 1, data: data[1]});
        this.$store.state.default_data.reddit.subreddits_data.subreddits.map((sub: Subreddit) => {
            this.subreddit_splited_data[sub.name] = sub.analysis;
        })
        this.entries.default.reddit.subreddit = data[1].n_entries;
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
