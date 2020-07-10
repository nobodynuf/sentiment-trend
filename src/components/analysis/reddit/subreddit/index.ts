import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import SubTable from '@/components/tables/reddit/SubTable/index.vue'
import { Subreddit, RedditSub, DataTable, factor_emoji, tfactor } from '@/types';
import { AxiosResponse } from 'axios';
import VMarkdown from 'vue-markdown'
import axios from '@/axios'

const smile = require('@/assets/emojis/smile.png')
const angry = require('@/assets/emojis/angry.png')
const neutral = require('@/assets/emojis/neutral.png')

@Component({
    components:{
        PieChart,
        LineChart,
        VMarkdown,
        FactorEmo,
        SubTable
    }
})
export default class SubredditAnalyzer extends Vue {
    search_input = "golang";
    voidTextFiel = false
    
    subreddit! : Subreddit
    n_entries : number = 0;
    enabledSub = false
    sub_analysis : {[key: string] : number} = {}

    emojis = factor_emoji
    emoji = angry

    pie_analysis : {name: string, y: number}[] = []
    loading = false;

    // translation
    menu_title = false;
    translated_title = ""

    menu_body = false;
    translated_body = "";
    
    
    mounted() {
        this.loadSubreddit()
    }

    loadSubreddit(){
        let dataSubreddit = this.$store.state.reddit.fetched_subreddit.subreddit
        if(dataSubreddit != undefined){
            this.subreddit = dataSubreddit
            this.n_entries = this.subreddit.n_entries;
            this.pie_analysis = [];
            Object.keys(this.subreddit.analysis).map(key => {
                if(this.subreddit){
                    this.pie_analysis.push({
                        name:key.replace(/[_]/gi," "),
                        y: this.subreddit.analysis[key]
                    })
                }
            })
            this.$set(this.subreddit, "analysis", this.subreddit.analysis);
            this.$set(this.subreddit, "submissions", this.subreddit.submissions);
            this.enabledSub = true
        }
    }

    async findSubreddit(){
        this.voidTextFiel = true
        this.loading = true;
        const name = this.search_input;
        const res = await this.getSubreddit(name);
        this.subreddit = res;
        const payload = {
            n_entries: res.n_entries,
            subreddit: res
        }
        this.$store.commit("set_reddit_subreddit" ,payload)
        this.n_entries = res.n_entries;
        this.pie_analysis = [];
        Object.keys(this.subreddit.analysis).map(key => {
            if(this.subreddit){
                this.pie_analysis.push({
                    name:tfactor[key],
                    y: this.subreddit.analysis[key]
                })
            }
        })
        this.$set(this.subreddit, "analysis", this.subreddit.analysis);
        this.$set(this.subreddit, "submissions", this.subreddit.submissions);
        this.loading = false;
        this.enabledSub = true
        this.search_input = ""
    }

    async getSubreddit(name: string){
        const res : AxiosResponse<{subreddit: Subreddit}> = await axios.get("/reddit/subreddit/" + name);
        return res.data.subreddit;
    }

    async translate_title(text: string){
        this.menu_title = true;
        this.translated_title = await this.getTranslation(text)
    }

    async translate_body(text: string){
        this.menu_body = true;
        this.translated_body = await this.getTranslation(text)
    }

    async getTranslation(text: string){
        const res: AxiosResponse<{translation: string}> = await axios.post("/translate", {text});
        return res.data.translation
    }

    onSearchChange() {
        if(this.search_input == "" || this.loading == true){
            this.voidTextFiel = true
        }else{
            this.voidTextFiel = false
        }
    }
}