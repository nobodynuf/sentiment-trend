import { Component, Vue, Watch } from 'vue-property-decorator'
import PieChart from '../components/charts/PieChart/index.vue'

@Component({
    components : {
        PieChart
    }
})
export default class HomeView extends Vue {
    
}