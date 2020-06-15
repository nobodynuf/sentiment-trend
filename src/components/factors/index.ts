import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { DataTable } from '@/types';

@Component
export default class FactorEmo extends Vue {
    
    @Prop({default : {}})
    analysis !: {[key: string] : number};

    table = new DataTable<{factor: string, value: number}>({
        headers: [
            {
                text: "Factor",
                value: "factor",
                align: "left"
            },
            {
                text: "",
                value: "value",
                align: "left"
            }
        ],
        rowsPerPageText: "Factores por página",
        noDataText: "Sin registro de factores"
    })

    mounted(){
        this.table.data = []
        this.$set(this.table, 'data', Object.keys(this.analysis).map(key => {
            return {
                factor: key,
                value: this.analysis[key]
            }
        }))
        this.$set(this.table, 'data', this.table.data)
    }

    @Watch("analysis", {deep: true})
    async onChange(){
        this.table.data = []
        this.$set(this.table, 'data', Object.keys(this.analysis).map(key => {
            return {
                factor: key,
                value: this.analysis[key]
            }
        }))
        this.$set(this.table, 'data', this.table.data)
        $debug('log', this.table.data);
        await this.$forceUpdate();
    }

}