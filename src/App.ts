import { Component, Vue } from 'vue-property-decorator'
import navBar from "./components/navBar.vue";
@Component({components:{
    navBar
}})
export default class App extends Vue {
}