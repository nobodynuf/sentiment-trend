import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { DataTable, tfactor } from '@/types';

@Component
export default class FactorEmo extends Vue {
    
    @Prop({default : {}})
    analysis !: {[key: string] : number};

    readonly color0_25 = "factor0_25";
    readonly color26_50 = "factor26_50";
    readonly color51_75 = "factor51_75";
    readonly color76_100 = "factor76_100";
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
                align: "right"
            }
        ],
        rowsPerPageText: "Factores por página",
        noDataText: "Sin registro de factores"
    })

    mounted(){
        this.table.data = []
        this.$set(this.table, 'data', Object.keys(this.analysis).map(key => {
            return {
                factor: tfactor[key],
                value: this.analysis[key]
            }
        }))
        this.$set(this.table, 'data', this.table.data)
    }

    getColor (value: number) {
        if (value > 75) return this.color76_100
        else if (value > 50) return this.color51_75
        else if (value > 25) return this.color26_50
        else return this.color0_25
      }
    @Watch("analysis", {deep: true})
    async onChange(){
        this.table.data = []
        this.$set(this.table, 'data', Object.keys(this.analysis).map(key => {
            return {
                factor: tfactor[key],
                value: this.analysis[key]
            }
        }))
        this.$set(this.table, 'data', this.table.data)
        $debug('log', this.table.data);
        await this.$forceUpdate();
    }

}