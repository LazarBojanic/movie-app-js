<template>
    <div class="container">

      <div class="row">
        <div v-for="filmInLibrary in currentPageFilms" :key="filmInLibrary.film.id" class="col-sm-4">
          <FilmInLibrary :filmInLibraryProp="filmInLibrary"></FilmInLibrary>
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
  import FilmInLibrary from '@/components/FilmInLibrary.vue'
  import Cookies from 'js-cookie'
  import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
  export default {
    name: 'Library',
    components: {
      FilmInLibrary
    },
    data() {
      return {
  
        currentPage: 1,
        filmsPerPage: 20,
        searchText: '',
      }
    },
    computed: {
        ...mapGetters([
        'getFilmsInLibrary'
      ]),
      currentPageFilms() {
        const start = (this.currentPage - 1) * this.filmsPerPage;
        return Object.values(this.getFilmsInLibrary).slice(start, start + this.filmsPerPage);
      },
      pages() {
        return Array.from({ length: Math.ceil(Object.values(this.getFilmsInLibrary).length / this.filmsPerPage) }, (_, i) => i + 1);
      }
    },
    mounted() {
      this.fetchFilmsInLibrary();
    },
    methods: {
     
      ...mapActions(["fetchFilmsInLibrary"]),
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