import { Component, Vue, Prop } from 'vue-property-decorator'
//import UserProfile from '@/components/UserProfile/index.vue'
//import ProfileForm from '@/components/forms/profile/index.vue'
import Subreddit from '@/components/analysis/reddit/subreddit/index.vue'
import Subreddits from '@/components/analysis/reddit/subreddits/index.vue'
import User from '@/components/analysis/reddit/user/index.vue'
import Users from '@/components/analysis/reddit/users/index.vue'

@Component({
    components: {
        "r-sub" : Subreddit,
        "r-subr": Subreddits,
        "r-user" : User,
        "r-users": Users
    }
})
export default class Reddit extends Vue {
    tab = null
    updateTabSubreddit : number = 0 
    updateTabUser : number = 0 
    
    selectedSubredditEvent($event : any) {
        this.updateTabSubreddit++
        this.tab = $event
    }

    selectedUserEvent($event : any) {
        this.updateTabUser++
        this.tab = $event
    }
}