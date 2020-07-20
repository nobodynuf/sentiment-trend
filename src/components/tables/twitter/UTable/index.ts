import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { TwitterUser, DataTable } from '@/types';

@Component({
    components: {
    }
})
export default class Rtab extends Vue {

    @Prop({default : {}})
    users!: TwitterUser
    user : TwitterUser | undefined
    
    subTable = new DataTable<TwitterUser>({
        headers: [
            {
                text: "Nombre",
                value: "name"
            },
            {
                text: "Descripción",
                value: "description"
            },
            {
                text: "",
                value: "_actions"
            }
        ],
        rowsPerPageText: "Entradas por página",
        noDataText: "Sin registro de entradas"
    });

    toggle_exclusive = 0
    
    page = 1
    pageCount = 0
    itemsPerPage = 12

    mounted(){
        this.subTable.data = []
        this.$set(this.subTable, "data", this.users);
        this.pageCount = Math.ceil(this.subTable.data.length / this.itemsPerPage)
    }

    setUser(id : string){   
        const user = this.subTable.data
        .find((user: { id: string }) => user.id === id)
        if(user != undefined){
            const n_entries = user.tweets_counts
            this.$store.commit("set_twitter_user", {n_entries, user});
            this.$emit("selected-user")
        }
        
    }
}
