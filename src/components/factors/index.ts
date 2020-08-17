import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { DataTable, tfactor } from '@/types';

@Component
export default class FactorEmo extends Vue {
    
    @Prop({default : {}})
    analysis !: {[key: string] : number};

    readonly factor0_19 = "factor0_19";
    readonly factor20_39 = "factor20_39";
    readonly factor40_59 = "factor40_59";
    readonly factor60_79 = "factor60_79";
    readonly factor80_100 = "factor80_100";

    criteriaTable = [
        { percentage: "0% a 19%", criterion: "Crítico", color: "factor0_19" },
        { percentage: "20% a 39%", criterion: "Insuficiente", color: "factor20_39" },
        { percentage: "40% a 59%", criterion: "Regular", color: "factor40_59" },
        { percentage: "60% a 79%", criterion: "Suficiente", color: "factor60_79" },
        { percentage: "80% a 100%", criterion: "Excelente", color: "factor80_100" }
    ]
    

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
                factor: tfactor[key],
                value: this.analysis[key]
            }
        }))
        this.$set(this.table, 'data', this.table.data)
    }

    criterion(value : number){
        if (value > 79) return "Excelente"
        else if (value > 59) return "Suficiente"
        else if (value > 39) return "Regular"
        else if (value > 19) return "Insuficiente"
        else return "Crítico"
    }
    
    getColor (value: number) {
        if (value > 79) return this.factor80_100
        else if (value > 59) return this.factor60_79
        else if (value > 39) return this.factor40_59
        else if (value > 19) return this.factor20_39
        else return this.factor0_19
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