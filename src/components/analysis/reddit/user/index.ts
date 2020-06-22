import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import SubTable from '@/components/tables/SubTable/index.vue'
import { RedditUser, Subreddit, Analysis, RedditSub } from '@/types';
import { AxiosResponse } from 'axios';

import axios from '@/axios'

@Component({
    components:{
        PieChart,
        LineChart,
        FactorEmo,
        SubTable
    }
})
export default class SubredditAnalyzer extends Vue {
    
    search_input = "natefinch";
    pie_analysis : {name: string, y: number}[] = []
    iconImg :string = ""
    loading = false;
    user :RedditUser | undefined
    analysis : {[key: string] : number} = {}
    submissions:RedditSub[] | undefined

    async findUser(){
        this.loading = true;
        const name = this.search_input;
        this.user = await this.getUser(name);
        this.submissions = this.user.submissions
        this.analysis = this.user.analysis
        this.iconImg = this.user.icon_img
        this.pie_analysis = [];
        Object.keys(this.user.analysis).map(key => {
            if(this.user){
                this.pie_analysis.push({
                    name:key.replace(/[_]/gi," "),
                    y: this.user.analysis[key]
                })
            }
        })
        this.$set(this.user, "analysis", this.user.analysis);
        this.loading = false;
    }

    async getUser(name: string){
        const res : AxiosResponse<{user: RedditUser}>= await axios.get("/reddit/user/" + name);
        return res.data.user;
    }

}