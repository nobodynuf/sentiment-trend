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
    },
})
export default class UsersAnalyzer extends Vue {
    tab: string = "tab-4"
    socialMedia: SocialMedia = "reddit"
    fileInputType: String = "PostedRedditUsers"
    usersData!: PostedRedditUsers

    loading = false
    data_title = "Sin datos..."
    users: Array<RedditUser> = []

    risersSplittedData : {[key: string] : Analysis} = {}
    titleOfEmotionalManifestation = "manifestación emocional por redditors"

    analysis: {[key: string]: number} = {}
    pie_analysis: {name: string; y: number; value: number; type: string}[] = []

    num: number = 0

    mounted() {
        this.init()
    }

    async init() {
        this.loading = true
        this.usersData = this.$store.state.posted_data.reddit.users_data

        //loading data from store
        if (this.usersData.n_entries != 0) {
            this.data_title = "Cargando plantilla de datos..."
            this.users = this.usersData.users
            this.analysis = this.usersData.analysis
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie",
                })
            })
            this.risersSplittedData = {}
            this.users.map((user : RedditUser) =>{
                this.risersSplittedData[user.name] = user.analysis
            })
            this.data_title = `${this.usersData.n_entries} Registros`
            this.num++

        
        //loading data by default
        } else {
            this.data_title = "Cargando registros por defecto..."
            const {n_entries, users, analysis} = await this.getUsers()
            this.analysis = analysis
            this.users = users
            this.$set(this.users, "users", this.users)
            this.risersSplittedData = {}
            this.users.map((user : RedditUser) => {
                this.risersSplittedData[user.name] = user.analysis
            })
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie",
                })
            })

            this.data_title = `${n_entries} Registros`
            this.usersData.analysis = this.analysis
            this.usersData.n_entries = n_entries
            this.usersData.users = users
            this.$store.commit("set_posted_data", {
                SocialMedia: this.socialMedia,
                PostedRedditUsers: this.usersData,
            })
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

    receivedUsersEvent($event: {users: Array<RedditUser>; n_entries: number, analysis: Analysis}) {
        this.usersData.n_entries = $event.n_entries
        this.usersData.users = $event.users
        this.usersData.analysis = $event.analysis
        this.$store.commit("set_posted_data", { SocialMedia : this.socialMedia, PostedRedditUsers : this.usersData} )
        this.init()
    }
}
