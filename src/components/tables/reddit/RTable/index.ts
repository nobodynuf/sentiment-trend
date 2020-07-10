import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import FactorEmo from '@/components/factors/index.vue'
import VMarkdown from 'vue-markdown'
import { Subreddit, DataTable, factor_emoji, Analysis } from '@/types';
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
export default class Rtab extends Vue {

    @Prop({default : {}})
    subreddits!: Subreddit
    
    submission : Subreddit | undefined
    sub_analysis : {[key: string] : number} = {}
    
    emojis = factor_emoji
    emoji = angry
    
    detail_modal = false;
    subTable = new DataTable<Subreddit>({
        headers: [
            {
                text: "Nombre",
                value: "name"
            },
            {
                text: "Descripción",
                value: "description",
                align:"left"
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

    toggle_exclusive = 0

    menu_body = false;
    translated_body = "";

    loading = false;

    page = 1
    pageCount = 0
    itemsPerPage = 12

    mounted(){
        this.subTable.data = []
        this.$set(this.subTable, "data", this.subreddits);
        this.pageCount = Math.ceil(this.subTable.data.length / this.itemsPerPage)
    }

    async checkDetail(id : string){   
        const sub = this.subTable.data.find(val=> val.id===id);
        this.submission = sub;
        this.$set(this.sub_analysis, "sub_analysis", this.submission?.analysis);
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
