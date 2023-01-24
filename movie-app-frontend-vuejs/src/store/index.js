import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    film: {}
  },
  getters: {
    film: state => state.film
  },
  mutations: {
    setFilm(state, film) {
      state.film = film;
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
          commit('setFilm', film);
        });
    }
  },
  modules: {
  }
})
