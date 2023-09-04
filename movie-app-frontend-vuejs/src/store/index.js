import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode';
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
    studios: {},
    genres: {},
    countries: {},
    studiosForFilm: {},
    genresForFilm: {},
    countriesForFilm: {},
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
    getStudios: state => state.studios,
    getGenres: state => state.genres,
    getCountries: state => state.countries,
    getStudiosForFilm: state => state.studiosForFilm,
    getGenresForFilm: state => state.genresForFilm,
    getCountriesForFilm: state => state.countriesForFilm,
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
    setStudios: (state, studios) => {
      state.studios = studios;
    },
    setGenres: (state, genres) => {
      state.genres = genres;
    },
    setCountries: (state, countries) => {
      state.countries = countries;
    },
    setStudiosForFilm: (state, studiosForFilm) => {
      state.studiosForFilm = studiosForFilm;
    },
    setGenresForFilm: (state, genresForFilm) => {
      state.genresForFilm = genresForFilm;
    },
    setCountriesForFilm: (state, countriesForFilm) => {
      state.countriesForFilm = countriesForFilm;
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
      return fetch(`http://94.189.193.50:8001/api/film/get/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(film => {
          commit('setFilm', film);
        });
    },
    fetchFilms({ commit }, data) {
      const token = Cookies.get('token');
      const pageSize = data.pageSize;
      const pageNumber = data.pageNumber;
      return fetch(`http://94.189.193.50:8001/api/film/getAll/${pageSize}/${pageNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(films => {
        commit('setFilms', films);
      });
    },
    async searchFilms({ commit }, data){
      const token = Cookies.get('token');
      const searchTerm = data.searchTerm;
      const pageSize = data.pageSize;
      const pageNumber = data.pageNumber;
      const res = await fetch(`http://94.189.193.50:8001/api/film/search/${searchTerm}/${pageSize}/${pageNumber}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }});
          commit('setFilms', await res.json());
    },
    fetchArtist({ commit }, id) {
      const token = Cookies.get('token');
      return fetch(`http://94.189.193.50:8001/api/artist/get/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(artist => {
          commit('setArtist', artist);
        });
    },
    fetchArtists({ commit }, data) {
      const token = Cookies.get('token');
      const pageSize = data.pageSize;
      const pageNumber = data.pageNumber;
      return fetch(`http://94.189.193.50:8001/api/artist/getAll/${pageSize}/${pageNumber}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(artists => {
          commit('setArtists', artists);
        });
    },
    async searchArtists({ commit }, data){
      const token = Cookies.get('token');
      const searchTerm = data.searchTerm;
      const pageSize = data.pageSize;
      const pageNumber = data.pageNumber;
        const res = await fetch(`http://94.189.193.50:8001/api/artist/search/${searchTerm}/${pageSize}/${pageNumber}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }});
            commit('setArtists', await res.json());
    },
    fetchUser({ commit }) {
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      return fetch('http://94.189.193.50:8001/api/user/get/'.concat(decodedToken.id), {
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
      return fetch(`http://94.189.193.50:8001/api/filmInLibrary/getByUserIdAndFilmId/${userId}/${filmId}`, {
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
      return fetch('http://94.189.193.50:8001/api/filmInLibrary/getAllByUserId/'.concat(decodedToken.id), {
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
      fetch('http://94.189.193.50:8001/api/filmList/getAllByUserId/'.concat(userId), {
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
      return fetch('http://94.189.193.50:8001/api/filmList/get/'.concat(id), {
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
      return fetch('http://94.189.193.50:8001/api/filmList/create', {
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
      return fetch(`http://94.189.193.50:8001/api/filmInList/getByFilmListIdAndFilmId/${filmListId}/${filmId}`, {
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
      return fetch('http://94.189.193.50:8001/api/filmInList/getAllByFilmListId/'.concat(id), {
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
      return fetch('http://94.189.193.50:8001/api/filmInList/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)})
        .then(res => res.json());
    },
    fetchCrewMembers({commit}, id){
      const token = Cookies.get('token');
      fetch('http://94.189.193.50:8001/api/crewMember/getAllByFilmId/'.concat(id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(crewMembers => {
          commit('setCrewMembers', crewMembers);
      });
    },
    fetchStudiosForFilm({ commit }, filmId){
      const token = Cookies.get('token');
      return fetch('http://94.189.193.50:8001/api/studioOfFilm/getAllByFilmId/'.concat(filmId), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(studiosForFilm => {
          commit('setStudiosForFilm', studiosForFilm);
        });
    },
    fetchGenresForFilm({ commit }, filmId){
      const token = Cookies.get('token');
      return fetch('http://94.189.193.50:8001/api/genreOfFilm/getAllByFilmId/'.concat(filmId), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(genresForFilm => {
          commit('setGenresForFilm', genresForFilm);
        });
    },
    fetchCountriesForFilm({ commit }, filmId){
      const token = Cookies.get('token');
      return fetch('http://94.189.193.50:8001/api/countryOfFilm/getAllByFilmId/'.concat(filmId), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(countriesForFilm => {
          commit('setCountriesForFilm', countriesForFilm);
        });
    },
    submitReview({ commit }, data) {
      const token = Cookies.get('token');
      return fetch('http://94.189.193.50:8001/api/filmInLibrary/update/'.concat(data.id), {
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
      return fetch('http://94.189.193.50:8001/api/filmInLibrary/add', {
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
        const res = fetch('http://94.189.193.50:8500/auth/register', {
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
      return fetch('http://94.189.193.50:8500/auth/logout', {
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
      return fetch('http://94.189.193.50:8001/api/filmInLibrary/delete/'.concat(id), {
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
      return fetch('http://94.189.193.50:8001/api/filmInList/delete/'.concat(id), {
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
      fetch('http://94.189.193.50:8001/api/crewMember/getAllByArtistId/'.concat(id), {
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
