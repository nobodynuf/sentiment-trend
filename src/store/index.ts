import Vue from 'vue'
import Vuex, { Payload } from 'vuex'
import { RedditUser, Subreddit, TwitterUser, Hashtag } from '@/types'

Vue.use(Vuex)

export interface IterativeEntity {
  n_entries: number
}

export type PostedRedditUsers = IterativeEntity & {users: RedditUser[]}
export type PostedSubreddits = IterativeEntity & {subreddits: Subreddit[]}
export type PostedTwitterUsers = IterativeEntity & {users: TwitterUser[]}
export type PostedHashtags = IterativeEntity & {hashtags: Hashtag[]}

export interface IStore {
  posted_data: {
    reddit: {
      users_data: PostedRedditUsers,
      subreddits_data: PostedSubreddits
    },
    twitter: {
      users_data: PostedTwitterUsers,
      hashtags_data: PostedHashtags
    }
  },
  reddit: {
    fetched_user: {
      n_entries: number
      user: RedditUser | undefined
    },
    fetched_subreddit: {
      n_entries: number
      subreddit: Subreddit | undefined
    }
  },
  twitter: {
    fetched_user:{
      n_entries: number,
      user: TwitterUser | undefined
    },
    fetched_hashtag: {
      n_entries: number,
      hashtag: Hashtag | undefined
    }
  }
}

export type SocialMedia = "twitter" | "reddit"

export default new Vuex.Store<IStore>({
  state: {
    posted_data: {
      reddit: {
        subreddits_data:{
          n_entries: 0,
          subreddits: []
        },
        users_data: {
          n_entries: 0,
          users: []
        }
      },
      twitter: {
        hashtags_data: {
          hashtags: [],
          n_entries: 0
        },
        users_data: {
          n_entries: 0,
          users: []
        }
      }
    },
    reddit: {
      fetched_subreddit: {
        n_entries: 0,
        subreddit: undefined
      },
      fetched_user: {
        n_entries: 0,
        user: undefined
      }
    },
    twitter: {
      fetched_hashtag: {
        hashtag: undefined,
        n_entries: 0
      },
      fetched_user: {
        n_entries: 0,
        user: undefined
      }
    }
  },
  mutations: {
    set_posted_data(state, payload: {social: SocialMedia, data: IStore["posted_data"]["reddit"] | IStore["posted_data"]["twitter"]}){
      if(payload.social == "reddit"){
        let data : IStore["posted_data"]["reddit"] = payload.data as IStore["posted_data"]["reddit"]
        state.posted_data.reddit = data
      } else {
        let data : IStore["posted_data"]["twitter"] = payload.data as IStore["posted_data"]["twitter"]
        state.posted_data.twitter = data;
      }
    },
    set_reddit_user(state, payload: IterativeEntity & {user: RedditUser}){
      state.reddit.fetched_user = payload;
    },
    set_reddit_subreddit(state, payload: IterativeEntity & {subreddit: Subreddit}){
      state.reddit.fetched_subreddit = payload;
    },
    set_twitter_user(state, payload: IterativeEntity & {user: TwitterUser}){
      state.twitter.fetched_user = payload
    },
    set_twitter_hashtag(state, payload: IterativeEntity & {hashtag: Hashtag}){
      state.twitter.fetched_hashtag = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
