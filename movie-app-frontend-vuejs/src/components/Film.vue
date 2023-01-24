<template>
    <div class="film" @click="navigateToFilmDetailPage" @mousedown="clicked = true" @mouseup="clicked = false" :class="{'clicked': clicked}">
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
  import { mapActions } from 'vuex';
    export default {
      name: 'Film',
      
      props: {
        film: Object
      },
      data() {
        return {
          filmImageUrl: 'https://image.tmdb.org/t/p/w154',
          clicked: false
        }
      },
      mounted() {
        this.filmImageUrl = 'https://image.tmdb.org/t/p/w154'.concat(this.film.imageUrl);
        //alert(this.filmImageUrl);
      },
      methods: {
        ...mapActions(['getFilm']),
        navigateToFilmDetailPage() {
          this.getFilm(this.film.id).then(() => {
            this.$router.push({ name: 'filmDetails', params: { id: this.film.id } });
          });
        }
      }
    }
  
  </script>
  
  <style scoped>
  
    .film {
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

     /* Add styles for mouse hover */
  .film:hover {
    cursor: pointer; /* Change cursor to pointer */
    box-shadow: 0px 0px 10px #ccc; /* Add shadow */
    transform: scale(1.05); /* Scale up the card slightly */
  }

  /* Add styles for mouse click */
  .film.clicked {
    transform: scale(0.95); /* Scale down the card slightly */
    border-color: #007bff; /* Change border color */
  }

  .outline {
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  }
  
  </style>