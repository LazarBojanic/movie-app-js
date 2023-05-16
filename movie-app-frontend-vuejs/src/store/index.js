import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode';
import io from 'socket.io-client';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    film: {},
    films: {},
    artist: {},
    artists: {},
    artistCredits: {},
    user: null,
    errors: {},
    filmInLibrary: {},
    filmsInLibrary: {},
    filmLists: {},
    filmList: {},
    filmInList: {},
    filmsInList: {},
    studio: {},
    genre: {},
    country: {},
    crewMembers: {}
  },
  getters: {
    getFilm: state => state.film,
    getFilms: state => state.films,
    getArtist: state => state.artist,
    getArtists: state => state.artists,
    getArtistCredits: state => state.artistCredits,
    getUser: state => state.user,
    getFilmInLibrary: state => state.filmInLibrary,
    getFilmsInLibrary: state => state.filmsInLibrary,
    getFilmLists: state => state.filmLists,
    getFilmList: state => state.filmList,
    getFilmInList: state => state.filmInList,
    getFilmsInList: state => state.filmsInList,
    getStudio: state => state.studio,
    getGenre: state => state.genre,
    getCountry: state => state.country,
    getCrewMembers: state => state.crewMembers
  },
  mutations: {
    setArtist(state, artist) {
      state.artist = artist;
    },
    setArtists(state, artists) {
      state.artists = artists;
    },
    setArtistCredits(state, artistCredits) {
      state.artistCredits = artistCredits;
    },
    setFilm(state, film) {
      state.film = film;
    },
    setFilms(state, films) {
      state.films = films;
    },
    setUser: (state, user) => {
      state.user = user;
      state.errors = {};
    },
    setFilmInLibrary: (state, filmInLibrary) => {
      state.filmInLibrary = filmInLibrary;
    },
    setFilmsInLibrary: (state, filmsInLibrary) => {
      state.filmsInLibrary = filmsInLibrary;
    },
    setFilmLists: (state, filmLists) => {
      state.filmLists = filmLists;
    },
    setFilmList: (state, filmList) => {
      state.filmList = filmList;
    },
    setFilmInList: (state, filmInList) => {
      state.filmInList = filmInList;
    },
    setFilmsInList: (state, filmsInList) => {
      state.filmsInList = filmsInList;
    },
    setStudio: (state, studio) => {
      state.studio = studio;
    },
    setGenre: (state, genre) => {
      state.genre = genre;
    },
    setCountry: (state, country) => {
      state.country = country;
    },
    setCrewMembers: (state, crewMembers) => {
      state.crewMembers = crewMembers;
    },
    setErrors: (state, errors) => {
      state.errors = errors;
    }
  },
  actions: {
    fetchFilm({ commit }, id) {
      const token = Cookies.get('token');
      return fetch(`http://95.180.97.206:8000/api/film/get/${id}`, {
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
      return fetch('http://95.180.97.206:8000/api/film/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(films => {
          commit('setFilms', films);
        });
    },
    async searchFilms({ commit }, searchTerm){
      const token = Cookies.get('token');
      const res = await fetch('http://95.180.97.206:8000/api/film/search/'.concat(searchTerm), {
          headers: {
              'Authorization': `Bearer ${token}`
          }});
          commit('setFilms', await res.json());
    },
    fetchArtist({ commit }, id) {
      const token = Cookies.get('token');
      return fetch(`http://95.180.97.206:8000/api/artist/get/${id}`, {
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
      return fetch('http://95.180.97.206:8000/api/artist/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(artists => {
          commit('setArtists', artists);
        });
    },
    async searchArtists({ commit }, searchTerm){
      const token = Cookies.get('token');
        const res = await fetch('http://95.180.97.206:8000/api/artist/search/'.concat(searchTerm), {
            headers: {
                'Authorization': `Bearer ${token}`
            }});
            commit('setArtists', await res.json());
    },
    fetchUser({ commit }) {
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      return fetch('http://95.180.97.206:8000/api/user/get/'.concat(decodedToken.id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(user => {
          commit('setUser', user);
        });
    },
    fetchFilmInLibrary({ commit }, {userId, filmId} ) {
      const token = Cookies.get('token');
      console.log(userId + ' ' + filmId);
      return fetch(`http://95.180.97.206:8000/api/filmInLibrary/getByUserIdAndFilmId/${userId}/${filmId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(filmInLibrary => {
          //console.log('setting film in library' + filmInLibrary.id);
          commit('setFilmInLibrary', filmInLibrary);
        });
    },
    fetchFilmsInLibrary({ commit }) {
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      return fetch('http://95.180.97.206:8000/api/filmInLibrary/getAllByUserId/'.concat(decodedToken.id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(filmsInLibrary => {
          commit('setFilmsInLibrary', filmsInLibrary);
        });
    },
    fetchFilmLists({ commit }, userId){
      const token = Cookies.get('token');
      fetch('http://95.180.97.206:8000/api/filmList/getAllByUserId/'.concat(userId), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(filmLists => {
          commit('setFilmLists', filmLists);
        });
    },
    fetchFilmList({ commit }, id) {
      const token = Cookies.get('token');
      return fetch('http://95.180.97.206:8000/api/filmList/get/'.concat(id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(filmList => {
          commit('setFilmList', filmList);
        });
    },
    createFilmList({ commit }, data) {
      const token = Cookies.get('token');
      return fetch('http://95.180.97.206:8000/api/filmList/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json());
    },
    fetchFilmInList({ commit }, {filmListId, filmId}) {
      const token = Cookies.get('token');
      return fetch(`http://95.180.97.206:8000/api/filmInList/getByFilmListIdAndFilmId/${filmListId}/${filmId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(filmInList => {
          commit('setFilmInList', filmInList);
        });
    },
    fetchFilmsInList({ commit }, id) {
      const token = Cookies.get('token');
      return fetch('http://95.180.97.206:8000/api/filmInList/getAllByFilmListId/'.concat(id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(filmsInList => {
          commit('setFilmsInList', filmsInList);
        });
    },
    addFilmToFilmList({ commit }, data) {
      const token = Cookies.get('token');
      return fetch('http://95.180.97.206:8000/api/filmInList/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)})
        .then(res => res.json());
    },
    fetchCrewMembersForFilm({commit}, id){
      const token = Cookies.get('token');
      fetch('http://95.180.97.206:8000/api/crewMember/getAllByFilmId/'.concat(id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(crewMembers => {
          commit('setCrewMembers', crewMembers);
      });
    },
    fetchStudioForFilm({ commit }, id){
      const token = Cookies.get('token');
      return fetch('http://95.180.97.206:8000/api/studio/get/'.concat(id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(studio => {
          commit('setStudio', studio);
        });
    },
    fetchGenreForFilm({ commit }, id){
      const token = Cookies.get('token');
      return fetch('http://95.180.97.206:8000/api/genre/get/'.concat(id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(genre => {
          commit('setGenre', genre);
        });
    },
    fetchCountryForFilm({ commit }, id){
      const token = Cookies.get('token');
      return fetch('http://95.180.97.206:8000/api/country/get/'.concat(id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(country => {
          commit('setCountry', country);
        });
    },
    submitReview({ commit }, data) {
      const token = Cookies.get('token');
      return fetch('http://95.180.97.206:8000/api/filmInLibrary/update/'.concat(data.id), {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(filmInLibrary => {
          commit('setFilmInLibrary', filmInLibrary);
        });
    },
    addFilmToLibrary({ commit }, data) {
      const token = Cookies.get('token');
      return fetch('http://95.180.97.206:8000/api/filmInLibrary/add', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(filmInLibrary => {
          commit('setFilmInLibrary', filmInLibrary);
        });
    },

    register({ commit }, credentials) {
      //console.log(credentials);
      try {
        const res = fetch('http://95.180.97.206:8500/auth/register', {
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
    },
    logout({ commit }) {
      return fetch('http://95.180.97.206:8500/auth/logout', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => res.json())
      .then(tokenObj => {
        console.log(tokenObj.token);
        Cookies.set('token', tokenObj.token);
      });
    },
    removeFilmFromLibrary({ commit }, id) {
      const token = Cookies.get('token');
      return fetch('http://95.180.97.206:8000/api/filmInLibrary/delete/'.concat(id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json());
    },
    removeFilmFromFilmList({ commit }, id) {
      const token = Cookies.get('token');
      return fetch('http://95.180.97.206:8000/api/filmInList/delete/'.concat(id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json());
    },
    fetchArtistCredits({commit}, id){
      const token = Cookies.get('token');
      fetch('http://95.180.97.206:8000/api/crewMember/getAllByArtistId/'.concat(id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(artistCredits => {
          commit('setArtistCredits', artistCredits);
        });
    },
    addFilmToFilmListSocket({commit}, data){
      commit('setFilmsInList', data);
    }

  },
  modules: {
  }
  ,plugins: [createPersistedState()]
})
