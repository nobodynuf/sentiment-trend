import {Component, Vue, Watch} from "vue-property-decorator"
import {$debug} from "@/utils"
import PieChart from "@/components/charts/PieChart/index.vue"
import FactorPie from "@/components/charts/FactorPie/index.vue"
import FactorEmo from "@/components/factors/index.vue"
import UTable from "@/components/tables/reddit/UTable/index.vue"
import FileInput from "@/components/fileInput/index.vue"
import {RedditUser, tfactor, Analysis} from "@/types"
import {SocialMedia, PostedRedditUsers} from "@/store"
import axios from "@/axios"
import {AxiosResponse} from "axios"

@Component({
    components: {
        PieChart,
        FactorPie,
        FactorEmo,
        UTable,
        FileInput,
    }
})
export default class UsersAnalyzer extends Vue {
    tab: string = "tab-4"
    socialMedia: SocialMedia = "reddit"
    fileInputType: String = "PostedRedditUsers"
    data_title = "Sin datos "
    loading = false
    
    usersData!: PostedRedditUsers
    users: Array<RedditUser> = []

    risersSplittedData : {[key: string] : Analysis} = {}
    titleOfEmotionalManifestation = "manifestación emocional por redditors"

    analysis: {[key: string]: number} = {}
    pie_analysis: {name: string; y: number; value: number; type: string}[] = []

    mounted() {
        this.init()
    }

    async init() {
        this.loading = true
        this.pie_analysis = []
        this.risersSplittedData = {}

        //getting data from store
        this.usersData = this.$store.state.posted_data.reddit.users_data

        //loading data from store
        if (this.usersData.n_entries != 0) {
            this.data_title = "Cargando plantilla de datos "

            //used in emo-factor
            this.analysis = this.usersData.analysis

            //used in table
            this.users = this.usersData.users

            //loading data for the first chart
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie",
                })
            })

            //loading data for second chart
            this.users.map((user : RedditUser) =>{
                this.risersSplittedData[user.name] = user.analysis
            })

            this.data_title = `${this.usersData.n_entries} Registros`

        
        //loading data by default
        } else {

            this.data_title = "Cargando registros por defecto "

            this.usersData = this.$store.state.default_data.reddit.users_data

            if (this.usersData.n_entries == 0) {
                //getting data by default
                const {n_entries, users, analysis} = await this.getUsers()

                //updating data in store
                this.usersData.analysis = analysis
                this.usersData.n_entries = n_entries
                this.usersData.users = users

                this.$store.commit("set_default_data", {
                    SocialMedia: this.socialMedia,
                    grouped: 0,
                    data: this.usersData,
                })
            }
            
            //used in emo-factor
            this.analysis = this.usersData.analysis

            //used in table
            this.users = this.usersData.users


            //loading data for the first chart
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie",
                })
            })

            //loading data for second chart
            this.users.map((user : RedditUser) => {
                this.risersSplittedData[user.name] = user.analysis
            })
        
            this.data_title = `${this.usersData.n_entries} Registros`

        }
        this.loading = false
    }

    async getUsers() {
        const res: AxiosResponse<{
            users: Array<RedditUser>
            n_entries: number
            analysis: Analysis
        }> = await axios.get("/reddit/user")
        return res.data
    }

    selectedUserEvent() {
        this.$emit("selected-user", this.tab)
    }

    //template users loaded
    receivedUsersEvent() {
        this.init()
    }
}
