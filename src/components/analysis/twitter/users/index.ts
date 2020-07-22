import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FileInput from '@/components/fileInput/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import UTable from '@/components/tables/twitter/UTable/index.vue'
import axios from '@/axios'
import { AxiosResponse } from 'axios'
import { TwitterUser, tfactor } from '@/types'
import { SocialMedia, PostedTwitterUsers } from '@/store'
@Component({
    components:{
        PieChart,
        LineChart,
        FactorEmo,
        FileInput,
        UTable
    }
})
export default class UsersAnalyzer extends Vue {
    tab: string = "tab-4"
    socialMedia : SocialMedia = "twitter"
    fileInputType : String =  "PostedTwitterUsers"
    usersData! : PostedTwitterUsers
    loading = false;
    data_title = "Sin datos...";
    users : Array<TwitterUser> = []
    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number, value: number, type: string}[] = []


    num : number = 0 

    mounted() {
        this.init()   
    }

    async init(){
        this.loading = true
        this.usersData = this.$store.state.posted_data.twitter.users_data
        if( this.usersData.n_entries != 0 ){
            this.users = this.usersData.users;
            let total = 0
            Object.keys(this.users[0].analysis).map(key => {
                this.$set(this.analysis, key, 0);
            })
            this.users.map(user => {
                Object.keys(user.analysis).map(key => {
                    let sum = this.analysis[key] + user.analysis[key];
                    this.$set(this.analysis, key, sum);
                    total += user.analysis[key];
                });
            })
            Object.keys(this.analysis).map(key => {
                let div = this.analysis[key]/this.users.length;
                this.$set(this.analysis, key, div);
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key]*100/total,
                    type: "pie"
                })
            });
            this.$set(this.users, "users", this.users)
            this.data_title = `${ this.usersData.n_entries} Registros`;
        }else{
            this.data_title = "Cargando registros por defecto..."
            const {n_entries, users} = await this.getUsers()
            this.usersData.n_entries = n_entries
            this.usersData.users = users
            this.$store.commit("set_posted_data", { SocialMedia: this.socialMedia,PostedTwitterUsers : this.usersData} )
            let total = 0
            this.users = users
            Object.keys(users[0].analysis).map(key => {
                this.$set(this.analysis, key, 0);
            })
            users.map(user => {
                Object.keys(user.analysis).map(key => {
                    let sum = this.analysis[key] + user.analysis[key];
                    this.$set(this.analysis, key, sum);
                    total += user.analysis[key];
                });
            })
            Object.keys(this.analysis).map(key => {
                let div = this.analysis[key]/this.users.length;
                this.$set(this.analysis, key, div);
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key]*100/total,
                    type: "pie"
                })
            });
            this.users = users
            this.$set(this.users, "users", this.users)
            this.data_title = `${n_entries} Registros`;
        }
        this.num++
        this.loading = false;
    }


    async getUsers(){
        const res : AxiosResponse<{users: Array<TwitterUser>, n_entries: number}> = await axios.get("/twitter/user");
        return res.data;
    }

    selectEvent() {
        this.$emit("selected-user",this.tab)
    }

    receivedUsersEvent($event : PostedTwitterUsers) {
        this.usersData.n_entries = $event.n_entries
        this.usersData.users = $event.users
        this.$store.commit("set_posted_data", { SocialMedia : this.socialMedia, PostedTwitterUsers : this.usersData} )
        this.init()
    }

}