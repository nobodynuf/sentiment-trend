import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { Subreddit, DataTable } from '@/types';

@Component({
    components: {
    }
})
export default class Rtab extends Vue {

    @Prop({default : {}})
    subreddits!: Subreddit

    subreddit : Subreddit | undefined
    
    toggle_exclusive = 0
    
    page = 1
    pageCount = 0
    itemsPerPage = 12

    subTable = new DataTable<Subreddit>({
        headers: [
            {
                text: "Nombre",
                value: "name"
            },
            {
                text: "Descripción",
                value: "description",
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

    mounted(){
        this.subTable.data = []
        this.$set(this.subTable, "data", this.subreddits);
        this.pageCount = Math.ceil(this.subTable.data.length / this.itemsPerPage)
    }

    setSubreddit(id : string){   
        const subreddit = this.subTable.data
        .find((subreddit: { id: string }) => subreddit.id === id)
        if(subreddit != undefined){
            const n_entries = subreddit.n_entries
            this.$store.commit("set_reddit_subreddit", {n_entries, subreddit});
            this.$emit("selected-subreddit")
        }   
    }

    @Watch("subreddits", {deep: true})
    async onChange(){
        this.subTable.data = []
        this.$set(this.subTable, "data", this.subreddits);
        this.pageCount = Math.ceil(this.subTable.data.length / this.itemsPerPage)
    }
}
