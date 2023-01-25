<template>
    <div class="container">
      <div class="row">
        <div v-for="filmInList in currentPageFilms" :key="filmInList.film.filmId" class="col-sm-4">
          <FilmInList :filmInListObject="filmInList"></FilmInList>
        </div>
      </div>
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
  import { mapState, mapActions, mapGetters } from "vuex";
  export default {
    name: 'FilmList',
    components: {
        FilmInList
    },
    data() {
      return {
        currentPage: 1,
        filmsPerPage: 20,
      }
    },
    props:{
    },
    computed: {
        ...mapGetters([ 'getFilmsInList' ]),
        ...mapGetters([ 'getFilmInList' ]),
      currentPageFilms() {
        const start = (this.currentPage - 1) * this.filmsPerPage;
        return Object.values(this.getFilmsInList).slice(start, start + this.filmsPerPage);
      },
      pages() {
        return Array.from({ length: Math.ceil(Object.values(this.getFilmsInList).length / this.filmsPerPage) }, (_, i) => i + 1);
      }
    },
    mounted() {
        //console.log(this.filmListObject.id);
      this.fetchFilmsInList(this.$route.params.id);
  
    },
    methods: {
      ...mapActions(["fetchFilmsInList"]),
      goToPage(page) {
        this.currentPage = page
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--
        }
      },
      nextPage() {
        if (this.currentPage < this.pages.length) {
          this.currentPage++
        }
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