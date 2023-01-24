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
    }
  </style>