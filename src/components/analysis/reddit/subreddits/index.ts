import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import FactorPie from "@/components/charts/FactorPie/index.vue"
import FactorEmo from '@/components/factors/index.vue'
import RTable from '@/components/tables/reddit/RTable/index.vue'
import FileInput from '@/components/fileInput/index.vue'
import axios from '@/axios'
import { AxiosResponse } from 'axios'
import { Subreddit, tfactor, Analysis } from '@/types'
import { SocialMedia, PostedSubreddits } from '@/store'

@Component({
    components:{
        PieChart,
        FactorPie,
        FactorEmo,
        RTable,
        FileInput
}
})export default class SubredditsAnalyzer extends Vue {
    tab: string = "tab-2"
    socialMedia : SocialMedia = "reddit"
    fileInputType : String =  "PostedSubreddits"
    subredditsData! : PostedSubreddits
    subreddits: Array<Subreddit> = []

    risersSplittedData : {[key: string] : Analysis} = {}
    titleOfEmotionalManifestation = "manifestación emocional por Subreddits"

    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number, value: number, type: string}[] = []
 
    loading = false;
    data_title = "Sin datos ";

    mounted() {
        this.init()
    }

    async init(){
        this.loading = true;
        this.subredditsData = this.$store.state.posted_data.reddit.subreddits_data
        if( this.subredditsData.n_entries != 0 ){
            this.subreddits = this.subredditsData.subreddits;
            this.risersSplittedData = {}
            this.subreddits.map((subreddit : Subreddit) => {
                this.risersSplittedData[subreddit.name] = subreddit.analysis
            })
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie"
                })
            });
            this.$set(this.subreddits, "subreddit", this.subreddits)
            this.data_title = `${ this.subredditsData.n_entries} Registros`;
        

        //loading data by default
        }else{
            this.data_title = "Cargando registros por defecto..."
            const {n_entries ,subreddits, analysis} = await this.getSubreddits();
            this.subredditsData.n_entries = n_entries
            this.subredditsData.subreddits = subreddits
            this.subredditsData.analysis = analysis
            this.$store.commit("set_posted_data", { SocialMedia : this.socialMedia, PostedSubreddits : this.subredditsData} );
            this.subreddits = subreddits;
            this.risersSplittedData = {}
            this.subreddits.map((subreddit : Subreddit)=> {
                this.risersSplittedData[subreddit.name] = subreddit.analysis
            })
            Object.keys(this.analysis).map(key => {
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key],
                    type: "pie"
                })
            });
            this.$set(this.subreddits, "subreddit", this.subreddits)
            this.data_title = `${n_entries} Registros`;
        }
        this.loading = false;
    }

    async getSubreddits(){
        const res : AxiosResponse<{subreddits: Array<Subreddit>, n_entries: number, analysis: Analysis}> = await axios.get("/reddit/subreddit");
        return res.data;
    }

    selectEvent() {
        this.$emit("selected-subreddit",this.tab)
    }

    receivedSubredditsEvent($event : { subreddits : Array<Subreddit>, n_entries : number, analysis : Analysis }) {
        this.subredditsData.n_entries = $event.n_entries
        this.subredditsData.subreddits = $event.subreddits
        this.subredditsData.analysis = $event.analysis
        this.$store.commit("set_posted_data", { SocialMedia : this.socialMedia, PostedSubreddits : this.subredditsData} )
        this.init()
    }

}