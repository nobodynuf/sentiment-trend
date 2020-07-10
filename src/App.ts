import {Component, Vue} from "vue-property-decorator"
import navBar from "./components/navBar.vue"
@Component({
    components: {
        navBar,
    },
})
export default class App extends Vue {
    fab: boolean = false
    onScroll(e: {target: {scrollTop: any}}) {
        if (typeof window === "undefined") return
        const top = window.pageYOffset || e.target.scrollTop || 0
        this.fab = top > 20
    }
    toTop() {
        this.$vuetify.goTo(0)
    }
}
