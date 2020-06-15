import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'

@Component({
    components:{
        PieChart,
        LineChart
    }
})
export default class UserAnalyzer extends Vue {
    
}