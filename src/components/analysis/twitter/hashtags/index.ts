import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import PieChart from '@/components/charts/PieChart/index.vue'
import LineChart from '@/components/charts/LineChart/index.vue'
import FactorEmo from '@/components/factors/index.vue'
import FileInput from '@/components/fileInput/index.vue'
import HsTable from '@/components/tables/twitter/HsTable/index.vue'
import { Hashtag } from '@/types';
import axios from '@/axios'
import { AxiosResponse } from 'axios'
@Component({
    components:{
        PieChart,
        LineChart,
        FactorEmo,
        FileInput,
        HsTable
    }
})
export default class HashtagsAnalyzer extends Vue {
    
    hashtags: Array<Hashtag> = []
    n_entries : number = 0;

    analysis : {[key: string] : number} = {}
    pie_analysis : {name: string, y: number, value: number, type: string}[] = []
    
    loading = false;
    enabledHashtag = false
    data_title = "Sin datos...";
    
    mounted() {
        this.init()
    }

    async init(){
        this.loading = true;
        this.data_title = "Cargando registros por defecto..."
        const res = await this.getHashtags()
        this.hashtags = res.hashtags
        this.n_entries = res.n_entries
        let total = 0
        Object.keys(this.hashtags[0].analysis).map(key => {
            this.$set(this.analysis, key, 0);
        })
        this.hashtags.map(hashtag => {
            Object.keys(hashtag.analysis).map(key => {
                let sum = this.analysis[key] + hashtag.analysis[key];
                this.$set(this.analysis, key, sum);
                total += hashtag.analysis[key];
            });
        })
        
        Object.keys(this.analysis).map(key => {
            let div = this.analysis[key]/this.hashtags.length;
            this.$set(this.analysis, key, div);
            this.pie_analysis.push({
                name: key.replace(/[_]/gi," "),
                value: this.analysis[key],
                y: this.analysis[key]*100/total,
                type: "pie"
            })
        });
        this.$set(this.hashtags, "subreddit", this.hashtags)
        this.data_title = "";
        this.loading = false;
        this.enabledHashtag = true
    }

    async getHashtags(){
        const res :AxiosResponse<{n_entries:number, hashtags: Array<Hashtag>}> = await axios.get("/twitter/hashtags");
        return res.data;
    }

}