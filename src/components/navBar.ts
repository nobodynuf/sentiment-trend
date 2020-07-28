import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class navBar extends Vue {
    drawer: boolean = false
    logo = require('@/assets/psychology.png');
    mainLinks: Array<object> =  [
        { icon: "mdi-home", text: "Inicio", route: "/" },
    ]
    socialMediaLinks: Array<object> =  [
        { icon: "mdi-twitter", color:"twitter", text: "Twitter", route: "/twitter" },
        { icon: "mdi-reddit", color:"reddit", text: "Reddit", route: "/reddit" },
    ]
}