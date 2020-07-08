import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { $debug } from '@/utils'
import { TwitterUser } from '@/types';

@Component
export default class TwUserProfile extends Vue {
    @Prop({default : {}})
    nEntries!: Number

    @Prop({default : {}})
    twitterUser!: TwitterUser
}