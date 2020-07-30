import {Component, Vue, Watch, Prop} from "vue-property-decorator"
import {$debug} from "@/utils"
import PieChart from "../PieChart/index.vue"
import {tfactor, Analysis, Hashtag} from "@/types"
import { AxiosResponse } from 'axios'
import axios from '@/axios'

@Component({
    components: {
        PieChart
    }
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
                    y: Math.ceil(this.data[key][this.selected.key]),
                }
            })
        }
        return []
    }
}
