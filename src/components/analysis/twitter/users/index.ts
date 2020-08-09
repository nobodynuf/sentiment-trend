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
    data_title = "Sin datos ";
    loading = false;

    usersData! : PostedTwitterUsers
    users : Array<TwitterUser> = []

    risersSplittedData : {[key: string] : Analysis} = {}
    titleOfEmotionalManifestation = "manifestación emocional por Users"

    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number, value: number, type: string}[] = []
    
    mounted() {
        this.init()   
    }

    async init(){
        this.loading = true
        this.pie_analysis = []
        this.risersSplittedData = {}

        //getting data from store
        this.usersData = this.$store.state.posted_data.twitter.users_data
        
       
        //loading data from store
        if( this.usersData.n_entries != 0 ){
            this.data_title = "Cargando plantilla de datos "

            //used in emo-factor
            this.analysis = this.usersData.analysis

            //used in table
            this.users = this.usersData.users;

            //loading data for the first chart
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie"
                })
            });

            //loading data for second chart
            this.users.map((user : TwitterUser) =>{
                this.risersSplittedData[user.name] = user.analysis
            })
            this.data_title = `${this.usersData.n_entries} Registros`;
        
        
        //loading data by default
        }else{
            this.data_title = "Cargando registros por defecto "

            //getting data
            const {n_entries, users , analysis} = await this.getUsers()
            //updating data in store
            this.usersData.n_entries = n_entries
            this.usersData.users = users
            this.usersData.analysis = analysis
            this.$store.commit("set_posted_data", { 
                SocialMedia: this.socialMedia, 
                usersData : this.usersData
            })

            //used in emo-factor
            this.analysis = analysis

            //used in table
            this.users = this.usersData.users

            //loading data for the first chart
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie"
                })
            });

            //loading data for second chart
            users.map((user : TwitterUser) => {
                this.risersSplittedData[user.name] = user.analysis
            })
            
            this.data_title = `${n_entries} Registros`;

        }
        this.loading = false;
    }

  //default users
    async getUsers(){
        const res : AxiosResponse<{users: Array<TwitterUser>, 
            n_entries: number, analysis : Analysis}> = await axios.get("/twitter/user");
        return res.data;
    }

    selectEvent() {
        this.$emit("selected-user",this.tab)
    }

    //template users loaded
    receivedUsersEvent($event : { users : Array<TwitterUser>, n_entries : number, analysis: Analysis }) {
        
        //updating data in store
        this.usersData.n_entries = $event.n_entries
        this.usersData.users = $event.users
        this.usersData.analysis = $event.analysis
        this.$store.commit("set_posted_data", { 
            SocialMedia : this.socialMedia, 
            PostedTwitterUsers : this.usersData
        })
        
        this.init()
    }
}