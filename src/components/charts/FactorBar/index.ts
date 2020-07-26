import {Component, Vue, Watch, Prop} from "vue-property-decorator"
import {$debug} from "@/utils"
import ColumnChart from "../ColumnChart/index.vue"
import {tfactor, Analysis, Hashtag} from "@/types"
import { AxiosResponse } from 'axios'
import axios from '@/axios'

@Component({
    components: {
        ColumnChart,
    },
})
export default class FactorBar extends Vue {

    @Prop({default: 'Manifestación Emocional'})
    title !: string

    label = "Seleccionar factor emocional:"

    factors = Object.keys(tfactor).map(key => {
        return {key, val: tfactor[key]}
    })

    selected : {key: string, val: string} = {key: '',val: ''}

    @Prop({default: {}})
    data !: {[key: string] : Analysis}

    @Prop({default: 0})
    n_entries !: number

    @Watch('data')
    onDataChanged(){
        $debug('log', this.data);
    }

    mounted() {

    }

    get chartdata(){
        if(this.selected.key){
            return Object.keys(this.data).map(key => {
                return {
                    name: key,
                    data: [Math.round(this.data[key][this.selected.key])],
                    //drilldown: "#" + key
                }
            })
        }
        return []
    }
}
