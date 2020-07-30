import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import FactorEmo from '@/components/factors/index.vue'
import VMarkdown from 'vue-markdown'
import { Tweet, DataTable, factor_emoji, Analysis } from '@/types';
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
export default class TwTable extends Vue {

    @Prop({default : {}})
    tweets!: Tweet
    
    tweet : Tweet | undefined
    tw_analysis : {[key: string] : number} = {}
    
    page = 1
    pageCount = 0
    itemsPerPage = 12

    emojis = factor_emoji
    emoji = angry

    toggle_exclusive = 1
    detail_modal = false;
    subTable = new DataTable<Tweet>({
        headers: [
            {
                text: "N° de Retwitts",
                value: "retweet_count"
            },
            {
                text: "Tweet",
                value: "text",
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
        this.$set(this.subTable, "data", this.tweets);
        this.pageCount = Math.ceil(this.subTable.data.length / this.itemsPerPage)
    }

    async checkDetail(tw_id : string){   
        const res = await this.getTweet(tw_id);
        this.tw_analysis = res.analysis
        const twData = this.subTable.data.find(val=> val.id===tw_id);
        this.tweet = twData;
        this.$set(this, "tweet", this.tweet);
        this.$set(this, "tw_analysis", this.tw_analysis);
        const positivismo: number = this.tw_analysis["empatia"]
        if(positivismo > 15 && positivismo < 26){
            this.emoji = neutral
        } else if(positivismo >=75){
            this.emoji = smile
        } else {
            this.emoji = angry
        }
        this.detail_modal = true;
    }

    async getTweet(tw_id : string){
        const res: AxiosResponse<{analysis: Analysis}> = await axios.post("/twitter/analyze-tweet", {tw_id});
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

    @Watch("tweets", {deep: true})
    async onChange(){
        this.subTable.data = []
        this.$set(this.subTable, "data", this.tweets);
        this.pageCount = Math.ceil(this.subTable.data.length / this.itemsPerPage)
    }
}