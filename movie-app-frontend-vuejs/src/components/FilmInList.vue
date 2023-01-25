<template>
    <div class="filmInList" @click="navigateToFilmDetailPage" @mousedown="clicked = true" @mouseup="clicked = false" :class="{'clicked': clicked }">
      <h3>{{ filmInListObject.film.title }}</h3>
      
      <img v-if="filmInListObject.film.imageUrl" :src=filmImageUrl />
      <p v-else>Image not available</p>
      
      <ul>
        <li>Rating: {{ filmInListObject.film.rating }}</li>
        <li>{{ filmInListObject.film.releaseYear }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters } from 'vuex';
    export default {
      name: 'FilmInList',
      
      props: {
        filmInListObject: Object
      },
      computed:{
        ...mapGetters(['getFilmInList']),
        ...mapGetters(['getFilmList'])
      },
      data() {
        return {
          filmImageUrl: 'https://image.tmdb.org/t/p/w154',
          clicked: false
        }
      },
      mounted() {
        this.filmImageUrl = 'https://image.tmdb.org/t/p/w154'.concat(this.filmInListObject.film.imageUrl);
      },
      methods: {
        ...mapActions(['fetchFilm']),
        ...mapActions(['fetchFilmList']),
        ...mapActions(['fetchFilmInList']),
        navigateToFilmDetailPage() {
          const data = {
          filmListId: this.filmInListObject.filmList.filmListId,
          filmId: this.filmInListObject.film.filmId,
        }
          this.fetchFilmInList(data).then(() => {
            this.fetchFilm(this.getFilmInList.film.filmId).then(() => {
              this.$router.push({ name: 'filmDetails', params: { id: this.getFilmInList.film.filmId } });
            })
           
          })
          
        }
      }
    }
  
  </script>
  
  <style scoped>
    .filmInList {
      margin-top: 10px;
      border-style: solid;
      border-color: black;
      border-radius: 3px;
      display: inline-table;
      font-size: 2em; /* increase the font size */
      color: rgb(64, 212, 238); /* change the text color */
      font-weight: bold;
      text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1;
      width: 15vw;
      height: 18vw;
      font-family: 'Century Gothic', sans-serif; 
    }

     /* Add styles for mouse hover */
  .filmInList:hover {
    cursor: pointer; /* Change cursor to pointer */
    box-shadow: 0px 0px 10px #ccc; /* Add shadow */
    transform: scale(1.05); /* Scale up the card slightly */
  }

  /* Add styles for mouse click */
  .filmInList.clicked {
    transform: scale(0.95); /* Scale down the card slightly */
    border-color: #007bff; /* Change border color */
  }

  
  </style>