import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    film: {},
    user: null,
    errors: {}
  },
  getters: {
    film: state => state.film,
    user: state => state.user
  },
  mutations: {
    SET_FILM(state, film) {
      state.film = film;
    },
    SET_USER: (state, user) => {
      state.user = user
      state.errors = {}
    },
    SET_ERRORS: (state, errors) => {
      state.errors = errors
    }
  },
  actions: {
    getFilm({ commit }, id) {
      const token = Cookies.get('token');
      return fetch(`http://localhost:8000/api/film/get/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(film => {
          commit('SET_FILM', film);
        });
    },
    register({ commit }, credentials) {
      //console.log(credentials);
      try {
        const res = fetch('http://localhost:8500/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        const data = res.json()
        if (!res.ok) {
          throw new Error(data.message)
        }
        commit('SET_USER', data)
      } catch (error) {
        commit('SET_ERRORS', error)
      }
    }

  },
  modules: {
  }
})
