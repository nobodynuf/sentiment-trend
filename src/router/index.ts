import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/twitter',
    name: 'Twitter',
    component: () => import('../views/SocialNetworks/Twitter.vue')
  }, 
  {
    path: '/reddit',
    name: 'Reddit',
    component: () => import('../views/SocialNetworks/Reddit.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
