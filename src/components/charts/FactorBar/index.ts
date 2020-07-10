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

    label = "Seleccionar factor emocional:"

    factors = Object.keys(tfactor).map(key => {
        return {key, val: tfactor[key]}
    })

    selected : {key: string, val: string} = {key: '',val: ''}

    //@Prop({default: {}})
    data : {[key: string] : Analysis} = {}

    mounted() {
        this.init();
    }

    async init(){
        const hashtags = ["dogs", "cats", "turtles", "bunny", "golang", "nodejs", "python"];
        await hashtags.map(async hashtag => {
            const data = await this.getTweets(hashtag);
            this.$set(this.data, hashtag, data.hashtag.analysis);
        })
        $debug('log', this.data);
    }

    async getTweets(hashtag: string){
        const res : AxiosResponse<{n_entries: number,
            hashtag: Hashtag}> = await axios.get("/twitter/hashtags/"+hashtag);
        return res.data
    }

    get chartdata(){
        if(this.selected.key){
            return Object.keys(this.data).map(key => {
                return {
                    name: "#" + key,
                    data: [this.data[key][this.selected.key]],
                    //drilldown: "#" + key
                }
            })
        }
        return []
    }
}
