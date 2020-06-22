import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class navBar extends Vue {
    drawer: boolean = false
    mainLinks: Array<object> =  [
        { icon: "mdi-home", text: "Main", route: "/" },
    ]
    socialMediaLinks: Array<object> =  [
        { icon: "mdi-twitter", color:"#00acee", text: "Twitter", route: "/twitter" },
        { icon: "mdi-reddit", color:"#FF4301", text: "Reddit", route: "/reddit" },
    ]
}