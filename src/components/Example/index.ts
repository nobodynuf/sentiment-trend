import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class Example extends Vue {

    @Prop({default: 'Vue app'})
    msg !: string

    toJson(){
        const {msg} = this;
        return {msg};
    }

}