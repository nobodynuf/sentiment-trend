import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import RTable from '@/components/tables/reddit/RTable/index.vue'
import FileInput from '@/components/fileInput/index.vue'
import axios from '@/axios'
import { AxiosResponse } from 'axios'
import { Subreddit, tfactor } from '@/types'
import { SocialMedia, PostedSubreddits } from '@/store'

@Component({
    components:{
        PieChart,
        LineChart,
        FactorEmo,
        RTable,
        FileInput
}
})export default class SubredditsAnalyzer extends Vue {
    tab: string = "tab-2"
    socialMedia : SocialMedia = "reddit"
    subredditsData! : PostedSubreddits
    subreddits: Array<Subreddit> = []

    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number, value: number, type: string}[] = []
    
    loading = false;
    data_title = "Sin datos...";
    num : number = 0 

    mounted() {
        this.init()
    }

    async init(){
        this.loading = true;
        this.data_title = "Cargando registros por defecto..."
        this.subredditsData = this.$store.state.posted_data.reddit.subreddits_data
        if( this.subredditsData.n_entries != 0 ){
            this.subreddits = this.subredditsData.subreddits;
            let total = 0
            Object.keys(this.subreddits[0].analysis).map(key => {
                this.$set(this.analysis, key, 0);
            })
            this.subreddits.map(subreddit => {
                Object.keys(subreddit.analysis).map(key => {
                    let sum = this.analysis[key] + subreddit.analysis[key];
                    this.$set(this.analysis, key, sum);
                    total += subreddit.analysis[key];
                });
            })
            Object.keys(this.analysis).map(key => {
                let div = this.analysis[key]/this.subreddits.length;
                this.$set(this.analysis, key, div);
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key]*100/total,
                    type: "pie"
                })
            });
            this.$set(this.subreddits, "subreddit", this.subreddits)
            this.data_title = `${ this.subredditsData.n_entries} Registros`;
            this.num++
            
        }
        else{
            this.data_title = "Cargando registros por defecto..."
            const {n_entries ,subreddits} = await this.getSubreddits();
            this.subredditsData.n_entries = n_entries
            this.subredditsData.subreddits = subreddits
            this.$store.commit("set_posted_data", { SocialMedia : this.socialMedia, PostedSubreddits : this.subredditsData} );
            let total = 0
            this.subreddits = subreddits;
            Object.keys(this.subreddits[0].analysis).map(key => {
                this.$set(this.analysis, key, 0);
            })
            this.subreddits.map(subreddit => {
                Object.keys(subreddit.analysis).map(key => {
                    let sum = this.analysis[key] + subreddit.analysis[key];
                    this.$set(this.analysis, key, sum);
                    total += subreddit.analysis[key];
                });
            })
            
            Object.keys(this.analysis).map(key => {
                let div = this.analysis[key]/this.subreddits.length;
                this.$set(this.analysis, key, div);
                this.pie_analysis.push({
                    name: tfactor[key],
                    value: this.analysis[key],
                    y: this.analysis[key]*100/total,
                    type: "pie"
                })
            });
            this.$set(this.subreddits, "subreddit", this.subreddits)
            this.data_title = `${n_entries} Registros`;
        }
        this.loading = false;
    }

    async getSubreddits(){
        const res : AxiosResponse<{subreddits: Array<Subreddit>, n_entries: number}> = await axios.get("/reddit/subreddit");
        return res.data;
    }

    selectEvent() {
        this.$emit("selected-subreddit",this.tab)
    }

}