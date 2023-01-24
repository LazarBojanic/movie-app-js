<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav d-flex justify-content-center">
          <li class="nav-item">
              <form class="form-inline my-2 my-lg-0">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search films" aria-label="Search" v-model="searchText">
                  <button class="btn btn-outline-success my-2 my-sm-0 custom-button" type="submit" @click.prevent="searchFilms">Search</button>
              </form>
          </li>
      </ul>
      </div>
    </nav>
    <div class="row">
      <div v-for="film in currentPageFilms" :key="film.id" class="col-sm-4">
        <film :film="film"></film>
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
import Film from '@/components/Film.vue'
import Cookies from 'js-cookie'

export default {
  name: 'Films',
  components: {
    Film
  },
  data() {
    return {
      films: [],
      currentPage: 1,
      filmsPerPage: 20,
      searchText: '',
    }
  },
  computed: {
    currentPageFilms() {
      const start = (this.currentPage - 1) * this.filmsPerPage
      return this.films.slice(start, start + this.filmsPerPage)
    },
    pages() {
      return Array.from({ length: Math.ceil(this.films.length / this.filmsPerPage) }, (_, i) => i + 1)
    }
  },
  mounted() {

  this.filmIds = [];
  const token = Cookies.get('token');
  fetch('http://localhost:8000/api/film/getAll', {
      headers: {
          'Authorization': `Bearer ${token}`
      }})
  .then(res => res.json())
  .then(res => {
    this.films = res;
  });

  },
  methods: {
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
    },
    searchFilms(){
      const token = Cookies.get('token');
      fetch('http://localhost:8000/api/film/search/'.concat(this.searchText), {
          headers: {
              'Authorization': `Bearer ${token}`
          }})
      .then(res => res.json())
      .then(res => {
        this.films = res;
      });
    }
  }
}
</script>
<style scoped>
  .navbar {
    border: 3px solid rgb(59, 15, 110) !important;
    padding: 10px !important;
    margin: auto !important;
    background-color: rgba(70, 19, 165, 0.247) !important;
    border: 0 !important;
  }
  .navbar-nav{
    display: flex !important;
    justify-content: center !important;
  }
  .custom-button {
    background-color: #0b2cbe;
    color: #c8e4ff;
  }
</style>