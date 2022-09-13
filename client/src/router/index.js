import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Game from '../views/Game.vue'
import Editor from '../views/Editor.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
