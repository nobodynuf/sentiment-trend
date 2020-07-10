import {Component, Vue, Watch} from "vue-property-decorator"
import PieChart from "../components/charts/PieChart/index.vue"
import LineChart from "../components/charts/LineChart/index.vue"
import ColumnChart from "../components/charts/ColumnChart/index.vue"
import FactorChart from '../components/charts/FactorBar/index.vue'

@Component({
    components: {
        PieChart,
        LineChart,
        ColumnChart,
        FactorChart
    },
})
export default class HomeView extends Vue {

}
