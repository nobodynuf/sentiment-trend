import { Component, Vue, Prop } from 'vue-property-decorator'
import Hashtags from '@/components/analysis/twitter/hashtags/index.vue'
import Hashtag from '@/components/analysis/twitter/hashtag/index.vue'
import Users from '@/components/analysis/twitter/users/index.vue'
import User from '@/components/analysis/twitter/user/index.vue'

@Component({
    components: {
        "t-hasht" : Hashtags,
        "t-hash"  : Hashtag,
        "t-users" : Users,
        "t-user"  : User
    }
})
export default class Twitter extends Vue {
    tab = null
    updateTabHashtag : number = 0 
    updateTabUser : number = 0 
    
    selectedHashtagEvent($event : any) {
        this.updateTabHashtag++
        this.tab = $event
    }

    selectedUserEvent($event : any) {
        this.updateTabUser++
        this.tab = $event
    }
}