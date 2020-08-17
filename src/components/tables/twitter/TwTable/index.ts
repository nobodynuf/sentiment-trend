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

    toggle_exclusive = 0
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

    snackbar: boolean = false
    snackbarTime: number = 5500
    snackbarText: string = ''
    snackbarColor = ""
    
    mounted(){
        this.subTable.data = []
        this.$set(this.subTable, "data", this.tweets);
        this.pageCount = Math.ceil(this.subTable.data.length / this.itemsPerPage)
    }

    async checkDetail(tw_id : string){   
        const twData = this.subTable.data.find(val=> val.id === tw_id);
        this.tweet = twData;
        this.detail_modal = true;
        this.loading = true
        const res = await this.getTweet(tw_id);
        if(res != undefined){
            this.tw_analysis = res.analysis
        }
        this.loading = false
    }

    closingDialogue(){
        this.detail_modal = false;
        this.menu_title = false
        this.menu_body = false
        this.tw_analysis = {}
    }

    async getTweet(tweet_id : string){
        try{
            const res: AxiosResponse<{analysis: Analysis}> = await axios.post("/twitter/analyze-tweet", { tweet_id });
            return res.data
        } catch(e){
            if(e.response){
                this.snackbarText = "Registro del Tweet no encontrado"
                this.snackbarColor = "success"
            }else if(e.request){
                this.snackbarText = "Ocurrió un error, no se puede ver detalle del Tweet"
                this.snackbarColor = "error"
            }else{
                this.snackbarText = "Ocurrió un error, no se puede ver detalle del Tweet"
                this.snackbarColor = "error"
            }
            this.snackbar = true
        }
        
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