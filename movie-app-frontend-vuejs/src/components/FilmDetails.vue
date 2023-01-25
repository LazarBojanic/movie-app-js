<template>
    <div class="film-detail">
      <h2>{{ this.getFilm.title }}</h2>
      <img v-if="this.getFilm.imageUrl" :src="filmImageUrl" />
      <p v-else>Image not available</p>
      <ul>
        <li>Rating: {{ this.getFilm.rating }}</li>
        <li>Release Year: {{ this.getFilm.releaseYear }}</li>
      </ul>
      <p>{{ this.getFilm.synopsis }}</p>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'FilmDetails',
    
    data(){
      return{
        artistCredits: null
      }
    },

    computed: {
      ...mapGetters([
            'getFilm'
        ]),
      ...mapActions([
          'fetchArtistCredits'
      ]),
      filmImageUrl() {
        return 'https://image.tmdb.org/t/p/w154' + this.getFilm.imageUrl;
      }
    },
    mounted() {
      //this.$store.dispatch('fetchFilm', this.$route.params.id);
    }
  }
  </script>
  
  <style scoped>
    .film-detail {
      margin-top: 10px;
      border-style: solid;
      border-color: black;
      border-radius: 3px;
      display: inline-table;
      font-size: 2em; /* increase the font size */
      color: rgb(64, 212, 238); /* change the text color */
      font-weight: bold;
      text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1;
      font-family: 'Century Gothic', sans-serif;
    }
    .outline {
        text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    } 
  </style>