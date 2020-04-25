import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class navBar extends Vue {
    drawer: boolean = false
    links: Array<object> =  [
        { icon: "mdi-home", text: "Main", route: "/" },
        { icon: "", text: "Other", route: "/other" },
  
    ]
}