import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import FactorEmo from '@/components/factors/index.vue'
import VMarkdown from 'vue-markdown'
import { Hashtag, DataTable, factor_emoji, Analysis } from '@/types';
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
export default class HsTable extends Vue {

    @Prop({default : {}})
    hashtags!: Hashtag

    hashtag : Hashtag | undefined
    hs_analysis : {[key: string] : number} = {}
    
    page = 1
    pageCount = 0
    itemsPerPage = 12

    emojis = factor_emoji
    emoji = angry

    toggle_exclusive = 0
    detail_modal = false;
    subTable = new DataTable<Hashtag>({
        headers: [
            {
                text: "Hashtag",
                value: "name"
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
        this.$set(this.subTable, "data", this.hashtags);
        this.pageCount = Math.ceil(this.subTable.data.length / this.itemsPerPage)
    }

    async checkDetail(hsName : string){   
        const sub = this.subTable.data.find(val=> val.name===hsName);
        this.hashtag = sub;
        this.$set(this, "hs_analysis", this.hashtag?.analysis);
        const positivismo: number = this.hs_analysis["empatia"]
        if(positivismo > 15 && positivismo < 26){
            this.emoji = neutral
        } else if(positivismo >=75){
            this.emoji = smile
        } else {
            this.emoji = angry
        }
        this.detail_modal = true;
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