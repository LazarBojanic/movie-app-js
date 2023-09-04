<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse " id="navbarNav">
        <ul class="navbar-nav d-flex justify-content-center ms-auto">
          <li class="nav-item">
              <form class="form-inline my-2 my-lg-0 d-flex justify-content-center">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search films" aria-label="Search" v-model="searchText">
                  <button class="btn btn-outline-success my-2 my-sm-0 custom-button" type="submit" @click.prevent="searchFilmsButton">Search</button>
              </form>
          </li>
      </ul>
      </div>
    </nav>
    <div class="row">
      <div v-for="film in getFilms.films" :key="film.id" class="col-sm-4">
        <film :film="film"></film>
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
import Film from '@/components/Film.vue'
import Cookies from 'js-cookie'
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: 'Films',
  components: {
    Film
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      searchText: '',
    }
  },
  computed: {
      ...mapGetters([ 'getFilms' ]),
    pages() {
      return Array.from({ length: Math.ceil(this.getFilms.count / this.pageSize) }, (_, i) => i + 1);
    }
  },
  mounted() {
    this.fetchFilms({ pageSize: this.pageSize, pageNumber: this.currentPage });
  },
  methods: {
    ...mapActions(["fetchFilms"]),
    ...mapActions(["searchFilms"]),
    goToPage(page) {
      this.currentPage = page;
      this.fetchFilms({ pageSize: this.pageSize, pageNumber: this.currentPage });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.fetchFilms({ pageSize: this.pageSize, pageNumber: this.currentPage });
      }
    },
    nextPage() {
      if (this.currentPage < this.pages.length) {
        this.currentPage++
        this.fetchFilms({ pageSize: this.pageSize, pageNumber: this.currentPage });
      }
    },
    async searchFilmsButton(){
      await this.searchFilms(this.searchText);
      console.log(this.getFilms);
      //this.$store.dispatch('searchFilms', this.searchText);
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