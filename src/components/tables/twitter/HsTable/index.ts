import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { Hashtag, DataTable } from '@/types';

@Component({
    components: {
    }
})
export default class HsTable extends Vue {

    @Prop({default : {}})
    hashtags!: Hashtag

    hashtag : Hashtag | undefined
    

    toggle_exclusive = 0

    page = 1
    pageCount = 0
    itemsPerPage = 12

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
    
    mounted(){
        this.subTable.data = []
        this.$set(this.subTable, "data", this.hashtags);
        this.pageCount = Math.ceil(this.subTable.data.length / this.itemsPerPage)
    }

    setHashtag(name : string){   
        const hashtag = this.subTable.data.find((hashtag: { name: string }) => hashtag.name === name)
        if(hashtag != undefined){
            const n_entries = hashtag.tweets.length
            this.$store.commit("set_twitter_hashtag", {n_entries, hashtag});
            this.$emit("selected-hashtag")
        }   
    }

    @Watch("hashtags", {deep: true})
    async onChange(){
        this.subTable.data = []
        this.$set(this.subTable, "data", this.hashtags);
        this.pageCount = Math.ceil(this.subTable.data.length / this.itemsPerPage)
    }
}