<template>
    <div class="container">
      <div class="col-sm-6 justify-content-center">
          <div class="form-group">
            <label for="filmNamePar">Film Name</label>
            <input type="text" class="form-control" id="filmNamePar" v-model="filmNamePar" placeholder="Enter film name">
          </div>
        </div>
        <br/>
        <div class="col-sm-6">
          <button class="btn btn-primary" @click="addFilmToFilmListButton(filmNamePar)">Add Film to List</button>
        </div>
      <div class="row">
        <div v-for="filmInList in currentPageFilms" :key="filmInList.film.filmId" class="col-sm-4">
          <FilmInList :filmInListProp="filmInList"></FilmInList>
        </div>
      </div>
      <br/>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled': currentPage === 1}">
            <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
          </li>
          <li class="page-item" :class="{'active': currentPage === page}" v-for="page in pages" :key="page">
            <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{'disabled': currentPage === pages.length}">
            <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  import FilmInList from '@/components/FilmInList.vue'
  import Cookies from 'js-cookie'
  import jwtDecode from 'jwt-decode';
  import Joi from 'joi-browser';
  import { mapState, mapActions, mapGetters } from "vuex";
  import store from '../store/index';

  export default {
    name: 'FilmList',
    components: {
        FilmInList
    },
    data() {
      return {
        currentPage: 1,
        filmsPerPage: 20,
        filmNamePar: ''
      }
    },
    props:{
    },
    computed: {
        ...mapGetters([ 'getFilmsInList' ]),
        ...mapGetters([ 'getFilmInList' ]),
        ...mapGetters([ 'getFilms' ]),
        ...mapGetters([ 'getFilmList' ]),
      currentPageFilms() {
        const start = (this.currentPage - 1) * this.filmsPerPage;
        return Object.values(this.getFilmsInList).slice(start, start + this.filmsPerPage);
      },
      pages() {
        return Array.from({ length: Math.ceil(Object.values(this.getFilmsInList).length / this.filmsPerPage) }, (_, i) => i + 1);
      }
    },
    async mounted() {
        //console.log(this.filmListObject.id);
      await this.fetchFilmsInList(this.$route.params.id);
  
    },
    methods: {
      ...mapActions(["fetchFilmsInList"]),
      ...mapActions(["addFilmToFilmList"]),
      ...mapActions(["addFilmToFilmListSocket"]),
      ...mapActions(["addFilmToLibrary"]),
      ...mapActions(["searchFilms"]),
      goToPage(page) {
        this.currentPage = page;
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.pages.length) {
          this.currentPage++;
        }
      },
      async addFilmToFilmListButton(filmNamePar){
        await this.searchFilms({searchTerm: filmNamePar, 
          pageSize: 1,
          pageNumber: 1});
        const firstFilm = this.getFilms.films[0];
          console.log('film title' + firstFilm.title);
          const filmListData = {
            filmListId: this.getFilmList.id,
            filmId: firstFilm.id
          }
          await this.addFilmToFilmList(filmListData);
          const filmLibraryData = {
              serviceUserId: jwtDecode(Cookies.get('token')).id,
              filmId: firstFilm.id
            }
            await this.addFilmToLibrary(filmLibraryData);
            console.log('added film to library');
            console.log('added film to list');
      }
    }
  }
  </script>
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Century+Gothic&display=swap');
  :root {
        font-family: 'Century Gothic', sans-serif;
    }
    .navbar {
      border: 3px solid rgb(59, 15, 110) !important;
      padding: 10px !important;
      margin: auto !important;
      background-color: rgba(70, 19, 165, 0.247) !important;
      border: 0 !important;
      font-family: 'Century Gothic', sans-serif !important;
    }
    .navbar-nav{
      display: flex !important;
      justify-content: center !important;
    }
    .custom-button {
      background-color: #0b2cbe;
      color: #c8e4ff;
      font-family: 'Century Gothic', sans-serif;
    }
  </style>