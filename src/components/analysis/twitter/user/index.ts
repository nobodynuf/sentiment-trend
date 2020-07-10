import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import TwTable from '@/components/tables/twitter/TwTable/index.vue'
import TwUserProfile from '@/components/profile/twitter/user/index.vue'
import axios from '@/axios'
import { TwitterUser } from '@/types';
import { AxiosResponse } from 'axios';

@Component({
    components:{
        PieChart,
        LineChart,
        FactorEmo,
        TwTable,
        TwUserProfile
    }
})
export default class UserAnalyzer extends Vue {
    
    search_input = "elonmusk";
    voidTextFiel = false

    loading = false;
    enabledUser = false

    n_entries : number = 0;
    user! : TwitterUser

    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number}[] = []

    mounted() {
        this.loadUser()
    }

    loadUser(){
        let dataUser = this.$store.state.twitter.fetched_user
        if(dataUser.user != undefined){
            this.n_entries = dataUser.n_entries
            this.user = dataUser.user
            this.pie_analysis = [];
            Object.keys(this.user.analysis).map(key => {
                this.$set(this.analysis, key, this.user.analysis[key]);
                if(this.user){
                    this.pie_analysis.push({
                        name:key.replace(/[_]/gi," "),
                        y: this.user.analysis[key]
                    })
                }
            })
            this.$set(this.user, "tweets", this.user.tweets);
            this.loading = false;
            this.enabledUser = true
        }
    }

    async findUser(){
        this.voidTextFiel = true
        this.loading = true;
        const name = this.search_input;
        const res = await this.getUser(name);
        this.n_entries = res.n_entries
        this.user = res.user
        console.log(this.user)
        const payload = {
            n_entries: this.n_entries,
            user: this.user
        }
        this.$store.commit("set_twitter_user" ,payload)
        Object.keys(this.user.analysis).map(key => {
            this.$set(this.analysis, key, this.user.analysis[key]);
            if(this.user){
                this.pie_analysis.push({
                    name:key.replace(/[_]/gi," "),
                    y: this.user.analysis[key]
                })
            }
        })
        this.$set(this.user, "tweets", this.user.tweets);
        this.loading = false;
        this.enabledUser = true
        this.search_input = ""
    }

    async getUser(name: string){
        const res :AxiosResponse<{n_entries:number, user: TwitterUser}> = await axios.get("/twitter/user/" + name);
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