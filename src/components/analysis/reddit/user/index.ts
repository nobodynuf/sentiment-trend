import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import { RedditUser } from '@/types';
import { AxiosResponse } from 'axios';
import FactorEmo from '@/components/factors/index.vue'
import axios from '@/axios'

@Component({
    components:{
        PieChart,
        LineChart,
        FactorEmo
    }
})
export default class SubredditAnalyzer extends Vue {
    
    search_input = "natefinch";
    pie_analysis : {name: string, y: number}[] = []
    iconImg :string = ""
    loading = false;

    analysis : {[key: string] : number} = {}

    async findUser(){
        this.loading = true;
        const name = this.search_input;
        const res = await this.getUser(name);
        this.analysis = res.analysis
        this.iconImg = res.icon_img
        this.pie_analysis = [];
        Object.keys(res.analysis).map(key => {
            if(res){
                this.pie_analysis.push({
                    name:key.replace(/[_]/gi," "),
                    y: res.analysis[key]
                })
            }
        })
        this.$set(res, "analysis", res.analysis);
        this.loading = false;
    }

    async getUser(name: string){
        const res = await axios.get("/reddit/user/" + name);
        return res.data.user;
    }

}