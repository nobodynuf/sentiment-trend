import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import { Subreddit, RedditSub, DataTable, factor_emoji } from '@/types';
import { AxiosResponse } from 'axios';
import FactorEmo from '@/components/factors/index.vue'
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
        FactorEmo
    }
})
export default class SubredditAnalyzer extends Vue {
    
    search_input = "golang";

    subreddit : Subreddit | null = null
    n_entries : number = 0;
    
    submission !: RedditSub
    sub_analysis : {[key: string] : number} = {}

    emojis = factor_emoji
    emoji = angry

    detail_modal = false;
    subTable = new DataTable<RedditSub>({
        headers: [
            {
                text: "Nombre",
                value: "name"
            },
            {
                text: "Comentarios",
                value: "n_comments"
            },
            {
                text: "",
                value: "_actions"
            }
        ],
        rowsPerPageText: "Entradas por página",
        noDataText: "Sin registro de entradas"
    });
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
        this.subreddit = res.subreddit;
        this.subTable.data = res.submissions;
        this.n_entries = res.n_entries;
        this.pie_analysis = [];
        Object.keys(this.subreddit.analysis).map(key => {
            if(this.subreddit){
                this.pie_analysis.push({
                    name:key,
                    y: this.subreddit.analysis[key]
                })
            }
        })
        this.$set(this.subreddit, "analysis", this.subreddit.analysis);
        this.loading = false;
    }

    async getSubreddit(name: string){
        const res : AxiosResponse<{subreddit: Subreddit, n_entries: number, submissions: RedditSub[]}> = await axios.get("/reddit/subreddit/" + name);
        return res.data;
    }

    async translate_title(text: string){
        this.menu_title = true;
        this.translated_title = await this.getTranslation(text)
    }

    async translate_body(text: string){
        this.menu_body = true;
        this.translated_body = await this.getTranslation(text)
    }

    async checkDetail(id: string){
        const sub = this.subTable.data.find(val=> val.id===id);
        this.submission = {
            id : "",
            n_comments: 0,
            name: "",
            text: ""
        };
        if(sub){
            this.submission = sub;
            this.$set(this, "sub_analysis", this.subreddit?.analysis);
            const positivismo: number = this.sub_analysis["optimismo"]
            if(positivismo > 45 && positivismo < 75){
                this.emoji = neutral
            } else if(positivismo >=75){
                this.emoji = smile
            } else {
                this.emoji = angry
            }
            $debug('log', sub.text);
        }
        this.detail_modal = true;
    }

    async getTranslation(text: string){
        const res: AxiosResponse<{translation: string}> = await axios.post("/translate", {text});
        return res.data.translation
    }

}