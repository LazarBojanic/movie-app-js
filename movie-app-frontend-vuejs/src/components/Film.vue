<template>
    <div class="film">
      <h3>{{ film.title }}</h3>
      
      <img v-if="film.imageUrl" :src=filmImageUrl />
      <p v-else>Image not available</p>
      
      <ul>
        <li>Rating: {{ film.rating }}</li>
        <li>Release Year: {{ film.releaseYear }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  
    export default {
      name: 'Film',
      
      props: {
        film: Object
      },
      data() {
        return {
          filmImageUrl: 'https://image.tmdb.org/t/p/w154'
        }
      },
      mounted() {
        this.filmImageUrl = 'https://image.tmdb.org/t/p/w154'.concat(this.film.imageUrl);
        //alert(this.filmImageUrl);
      },
    }
  
  </script>
  
  <style scoped>
  
    .film {
      margin-top: 10px;
      border-style: solid;
      border-radius: 3px;
      display: inline-table;
    }
  
  </style>