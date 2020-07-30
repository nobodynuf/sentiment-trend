import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import FactorPie from "@/components/charts/FactorPie/index.vue"
import FileInput from '@/components/fileInput/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import UTable from '@/components/tables/twitter/UTable/index.vue'
import axios from '@/axios'
import { AxiosResponse } from 'axios'
import { TwitterUser, tfactor, Analysis } from '@/types'
import { SocialMedia, PostedTwitterUsers } from '@/store'
@Component({
    components:{
        PieChart,
        FactorPie,
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
    users : Array<TwitterUser> = []

    risersSplittedData : {[key: string] : Analysis} = {}
    titleOfEmotionalManifestation = "manifestación emocional por Users"

    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number, value: number, type: string}[] = []
    
    loading = false;
    enabledHashtag = false
    data_title = "Sin datos...";

    mounted() {
        this.init()   
    }

    async init(){
        this.loading = true
        this.usersData = this.$store.state.posted_data.twitter.users_data
        
        //loading data from store
        if( this.usersData.n_entries != 0 ){
            this.users = this.usersData.users;
            this.analysis = this.usersData.analysis
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie"
                })
            });
            this.risersSplittedData = {}
            this.users.map((user : TwitterUser) =>{
                this.risersSplittedData[user.name] = user.analysis
            })
            this.$set(this.users, "users", this.users)
            this.data_title = `${ this.usersData.n_entries} Registros`;
        
        
        //loading data by default
        }else{
            this.data_title = "Cargando registros por defecto..."
            const {n_entries, users, analysis} = await this.getUsers()
            this.usersData.n_entries = n_entries
            this.usersData.users = users
            this.usersData.analysis = analysis
            this.$store.commit("set_posted_data", { SocialMedia: this.socialMedia, usersData : this.usersData} )
            this.users = users
            this.risersSplittedData = {}
            users.map((user : TwitterUser) => {
                this.risersSplittedData[user.name] = user.analysis
            })
            Object.keys(this.analysis).map(key => {
                let div = this.analysis[key]/this.users.length;
                this.$set(this.analysis, key, div);
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie"
                })
            });
            this.users = users
            this.$set(this.users, "users", this.users)
            this.data_title = `${n_entries} Registros`;
        }
        this.enabledHashtag = true
        this.loading = false;
    }

  //default users
    async getUsers(){
        const res : AxiosResponse<{users: Array<TwitterUser>, n_entries: number, analysis : Analysis}> = await axios.get("/twitter/user");
        return res.data;
    }

    selectEvent() {
        this.$emit("selected-user",this.tab)
    }

    //template users loaded
    receivedUsersEvent($event : { users : Array<TwitterUser>, n_entries : number, analysis: Analysis }) {
        this.usersData.n_entries = $event.n_entries
        this.usersData.users = $event.users
        this.usersData.analysis = $event.analysis
        this.$store.commit("set_posted_data", { SocialMedia : this.socialMedia, PostedTwitterUsers : this.usersData} )
        this.init()
    }
}