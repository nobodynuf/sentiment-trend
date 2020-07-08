import { Component, Vue, Watch } from 'vue-property-decorator'
import { $debug } from '@/utils'
import axios from '@/axios'

@Component
export default class UserProfile extends Vue {
    
    profile : any = null
    has_request = false
    user_input = "Nocturnal1017"
    chip_color = {
        positivism : "",
        emo_reg: ""
    }
    emo_reg_text = ""
    loading = false;

    mounted(){

    }

    async searchUser(){
        this.loading = true;
        const user_id = this.user_input
        const response = await axios.get('reddit?user=' + user_id)
        $debug('log', response.data);
        this.profile = response.data;
        this.loading = false;
        this.has_request = true;
        const polarity_text = this.profile.factors.positivism.polarity_text;

        if(polarity_text == "positive"){
            this.chip_color.positivism = "light-green lighten-1"
        } else if(polarity_text == "negative"){
            this.chip_color.positivism = "coral";
        } else {
            this.chip_color.positivism = "amber"
        }

        const emo_reg = this.profile.factors.emotional_regulation.classification;

        if(emo_reg == "H"){
            this.emo_reg_text = "Alta"
            this.chip_color.emo_reg = "light-green lighten-1"
        } else if(emo_reg == "L"){
            this.emo_reg_text = "Baja"
            this.chip_color.emo_reg = "coral";
        } else {
            this.emo_reg_text = "Media"
            this.chip_color.emo_reg = "amber"
        }
    }

}