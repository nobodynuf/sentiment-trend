import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FileInput from '@/components/fileInput/index.vue'

@Component({
    components:{
        PieChart,
        LineChart,
        FileInput
    }
})
export default class UsersAnalyzer extends Vue {
    
}