import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import SubTable from '@/components/tables/reddit/SubTable/index.vue'
import { RedditUser, Subreddit, Analysis, RedditSub, tfactor } from '@/types';
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
export default class UserAnalyzer extends Vue {
    search_input = "";
    voidTextFiel = false

    pie_analysis : {name: string, y: number}[] = []
    iconImg :string = ""
    n_entries : number = 0
    loading = false;
    user! :RedditUser
    analysis : {[key: string] : number} = {}
    submissions:RedditSub[] | undefined
    enabledSub = false

    mounted() {
        this.loadUser()
        this.$vuetify.goTo(0,{
            duration: 0,
            offset: 0
        })
    }

    loadUser() {
        let dataUser = this.$store.state.reddit.fetched_user.user
        if(dataUser != undefined){
            this.user = dataUser
            this.submissions = this.user.submissions
            this.analysis = this.user.analysis
            this.iconImg = this.user.icon_img
            this.pie_analysis = [];
            Object.keys(this.user.analysis).map(key => {
                if(this.user){
                    this.pie_analysis.push({
                        name: tfactor[key],
                        y: this.user.analysis[key]
                    })
                }
            })
            this.$set(this.user, "analysis", this.user.analysis);
            this.$set(this.user, "submissions", this.user.submissions);
            this.enabledSub = true
        }
    }

    async findUser(){
        this.voidTextFiel = true
        this.loading = true;
        const name = this.search_input;
        const {n_entries,user} = await this.getUser(name);
        this.n_entries = user.n_entries;
        this.user = user;
        this.$store.commit("set_reddit_user", {n_entries, user});
        this.submissions = this.user.submissions
        this.analysis = this.user.analysis
        this.iconImg = this.user.icon_img
        this.pie_analysis = [];
        Object.keys(this.user.analysis).map(key => {
            if(this.user){
                this.pie_analysis.push({
                    name:tfactor[key],
                    y: this.user.analysis[key]
                })
            }
        })
        this.$set(this.user, "analysis", this.user.analysis);
        this.$set(this.user, "submissions", this.user.submissions);
        this.loading = false;
        this.enabledSub = true
        this.search_input = ""
    }

    async getUser(name: string){
        const res : AxiosResponse<{user: RedditUser, n_entries: number}>= await axios.get("/reddit/user/" + name);
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