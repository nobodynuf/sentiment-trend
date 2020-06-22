import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import SubTable from '@/components/tables/SubTable/index.vue'
import { Subreddit, RedditSub, DataTable, factor_emoji } from '@/types';
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

    subreddit : Subreddit | null = null
    n_entries : number = 0;
    
    submission !: RedditSub[]
    sub_analysis : {[key: string] : number} = {}

    emojis = factor_emoji
    emoji = angry

    detail_modal = false;
    pie_analysis : {name: string, y: number}[] = []
    loading = false;

    // translation
    menu_title = false;
    translated_title = ""

    menu_body = false;
    translated_body = "";

    async findSubreddit(){
        this.loading = true;
        const name = this.search_input;
        const res = await this.getSubreddit(name);
        this.subreddit = res;
        this.submission = res.submissions;
        this.n_entries = res.n_entries;
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
        this.loading = false;
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
}