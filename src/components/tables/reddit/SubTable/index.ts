import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import FactorEmo from '@/components/factors/index.vue'
import VMarkdown from 'vue-markdown'
import { RedditSub, DataTable, factor_emoji, Analysis } from '@/types';
import axios from '@/axios'
import { AxiosResponse } from 'axios';

const smile = require('@/assets/emojis/smile.png')
const angry = require('@/assets/emojis/angry.png')
const neutral = require('@/assets/emojis/neutral.png')
@Component({
    components: {
        FactorEmo,
        VMarkdown
    }
})
export default class SubTable extends Vue {

    @Prop({default : {}})
     submissions!: RedditSub
    
    submission : RedditSub | undefined
    sub_analysis : {[key: string] : number} = {}
    
    page = 1
    pageCount = 0
    itemsPerPage = 12

    emojis = factor_emoji
    emoji = angry
    
    toggle_exclusive = 0
    detail_modal = false;
    subTable = new DataTable<RedditSub>({
        headers: [
            {
                text: "Nombre",
                value: "name"
            },
            {
                text: "Comentarios",
                value: "n_comments",
                align:"center"
            },
            {
                text: "",
                value: "_actions"
            }
        ],
        rowsPerPageText: "Entradas por página",
        noDataText: "Sin registro de entradas"
    });
    // translation
    menu_title = false;
    translated_title = ""

    menu_body = false;
    translated_body = "";

    loading = false;
    
    mounted(){
        this.subTable.data = []
        this.$set(this.subTable, "data", this.submissions);
        this.pageCount = Math.ceil(this.subTable.data.length / this.itemsPerPage)
    }

    async checkDetail(sub_id : string){   

        const res = await this.getRedditSub(sub_id);
        this.sub_analysis = res.analysis
        const sub = this.subTable.data.find(val=> val.id===sub_id);
        this.submission = sub;
        this.$set(this, "submission", this.submission);
        this.$set(this, "sub_analysis", this.sub_analysis);
        const positivismo: number = this.sub_analysis["empatia"]
        if(positivismo > 15 && positivismo < 26){
            this.emoji = neutral
        } else if(positivismo >=75){
            this.emoji = smile
        } else {
            this.emoji = angry
        }
        this.detail_modal = true;
    }

    async getRedditSub(sub_id : string){
        const res: AxiosResponse<{analysis: Analysis}> = await axios.post("/reddit/analyze-sub", {sub_id});
        return res.data
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