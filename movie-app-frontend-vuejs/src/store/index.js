import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    film: {},
    films: {},
    artist: {},
    artists: {},
    user: null,
    errors: {}
  },
  getters: {
    getFilm: state => state.film,
    getFilms: state => state.films,
    getArtist: state => state.artist,
    getArtists: state => state.artists,
    getUser: state => state.user
  },
  mutations: {
    setArtist(state, artist) {
      state.artist = artist;
    },
    setArtists(state, artists) {
      state.artists = artists;
    },
    setFilm(state, film) {
      state.film = film;
    },
    setFilms(state, films) {
      state.films = films;
    },
    setUser: (state, user) => {
      state.user = user
      state.errors = {}
    },
    setErrors: (state, errors) => {
      state.errors = errors
    }
  },
  actions: {
    fetchFilm({ commit }, id) {
      const token = Cookies.get('token');
      return fetch(`http://localhost:8000/api/film/get/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(film => {
          commit('setFilm', film);
        });
    },
    fetchFilms({ commit }) {
      const token = Cookies.get('token');
      return fetch('http://localhost:8000/api/film/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(films => {
          commit('setFilms', films);
        });
    },
    searchFilms({ commit }, searchTerm){
      const token = Cookies.get('token');
      fetch('http://localhost:8000/api/film/search/'.concat(searchTerm), {
          headers: {
              'Authorization': `Bearer ${token}`
          }})
      .then(res => res.json())
      .then(films => {
        commit('setFilms', films);
      });
    },
    fetchArtist({ commit }, id) {
      const token = Cookies.get('token');
      return fetch(`http://localhost:8000/api/artist/get/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(artist => {
          commit('setArtist', artist);
        });
    },
    fetchArtists({ commit }) {
      const token = Cookies.get('token');
      return fetch('http://localhost:8000/api/artist/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(artists => {
          commit('setArtists', artists);
        });
    },
    searchArtists({ commit }, searchTerm){
      const token = Cookies.get('token');
        fetch('http://localhost:8000/api/artist/search/'.concat(searchTerm), {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
        .then(res => res.json())
        .then(artists => {
          commit('setArtists', artists);
        });
    },
    fetchUser({ commit }) {
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      return fetch('http://localhost:8000/api/user/get/'.concat(decodedToken.id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(user => {
          commit('setUser', user);
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
        commit('setUser', data)
      } catch (error) {
        commit('setError', error)
      }
    }

  },
  modules: {
  }
  
})
