<template>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav d-flex justify-content-center ms-auto">
            <li class="nav-item">
                <form class="form-inline my-2 my-lg-0 d-flex justify-content-center">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search artists" aria-label="Search" v-model="searchText">
                    <button class="btn btn-outline-success my-2 my-sm-0 custom-button" type="submit" @click.prevent="searchArtistsButton">Search</button>
                </form>
            </li>
        </ul>
        </div>
      </nav>
      <div class="row">
        <div v-for="artist in currentPageArtists" :key="artist.id" class="col-sm-4">
          <artist :artist="artist"></artist>
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
  import Artist from '@/components/Artist.vue'
  import Cookies from 'js-cookie'
  import { mapState, mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'Artists',
    components: {
      Artist
    },
    data() {
      return {
        currentPage: 1,
        artistsPerPage: 20,
        searchText: '',
      }
    },
    computed: {
        ...mapGetters([
            'getArtists'
        ]),
      currentPageArtists() {
        const start = (this.currentPage - 1) * this.artistsPerPage;
        return Object.values(this.getArtists).slice(start, start + this.artistsPerPage);
      },
      pages() {
        return Array.from({ length: Math.ceil(Object.values(this.getArtists).length / this.artistsPerPage) }, (_, i) => i + 1);
      }
    },
    mounted() {
        this.fetchArtists();
    },
    methods: {
        ...mapActions([
        'fetchArtists'
        ]),
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
      searchArtistsButton(){
        this.$store.dispatch('searchArtists', this.searchText);
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