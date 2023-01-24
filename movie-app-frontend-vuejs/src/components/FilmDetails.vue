<template>
    <div class="film-detail">
      <h2>{{ film.title }}</h2>
      <img v-if="film.imageUrl" :src="filmImageUrl" />
      <p v-else>Image not available</p>
      <ul>
        <li>Rating: {{ film.rating }}</li>
        <li>Release Year: {{ film.releaseYear }}</li>
      </ul>
      <p>{{ film.synopsis }}</p>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'FilmDetails',
    computed: {
      ...mapState(['film']),
      filmImageUrl() {
        return 'https://image.tmdb.org/t/p/w154' + this.film.imageUrl;
      }
    },
    mounted() {
      this.$store.dispatch('getFilm', this.$route.params.id);
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
    }
    .outline {
        text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    } 
  </style>