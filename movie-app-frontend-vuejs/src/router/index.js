import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '../App.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import BrowseFilmsView from '../views/BrowseFilmsView.vue'
//import FilmDetails from '../components/FilmDetails.vue'
import FilmDetailsView from '../views/FilmDetailsView.vue'
import BrowseArtistsView from '../views/BrowseArtistsView.vue'
import ArtistCreditsView from '../views/ArtistCreditsView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import FilmListView from '../views/FilmListView.vue'
import PersonalFilmView from '../views/PersonalFilmView.vue'

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
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/browseFilms',
    name: 'browseFilms',
    component: BrowseFilmsView
  },
  {
    path: '/filmDetails',
    name: 'filmDetails',
    component: FilmDetailsView
  },
  {
    path: '/browseArtists',
    name: 'browseArtists',
    component: BrowseArtistsView
  },
  {
    path: '/artistCredits',
    name: 'artistCredits',
    component: ArtistCreditsView
  },
  {
    path: '/userProfile',
    name: 'userProfile',
    component: UserProfileView
  },
  {
    path: '/filmList',
    name: 'filmList',
    component: FilmListView
  },
  {
    path: '/personalFilm',
    name: 'personalFilm',
    component: PersonalFilmView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
