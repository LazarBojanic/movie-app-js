import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '../App.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import BrowseFilms from '../views/BrowseFilms.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'app',
    component: App
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/browseFilms',
    name: 'browseFilms',
    component: BrowseFilms
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
