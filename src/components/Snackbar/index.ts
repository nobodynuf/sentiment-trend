import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'

@Component({
    components:{
    }
})
export default class UserAnalyzer extends Vue {
    @Prop({default : ""})
    state!: boolean | null

    snackbar: boolean = false
    snackbarTime: number = 5000
    snackbarColor = ""
    text: string = ''

    mounted() {
        if(this.state == true){
            this.snackbarColor = "primary"
            this.text = "Busqueda exitosa"
            this.snackbar = true
        }else if(this.state == false){
            this.snackbarColor = "error"
            this.text = "No encontrado"
            this.snackbar = true
        }
    }
}