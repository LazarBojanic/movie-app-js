<template>
    <div class="filmInLibrary" @click="navigateToFilmDetailPage" @mousedown="clicked = true" @mouseup="clicked = false" :class="{'clicked': clicked }">
      <h1 v-if="filmInLibraryProp">{{ filmInLibraryProp.film.title }}</h1> 
      <img  v-if="filmInLibraryProp.film.imageUrl" :src=filmImageUrl />
      <p v-else>Image not available</p>
      <h1 v-if="filmInLibraryProp">{{ filmInLibraryProp.film.releaseYear }}</h1>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
    export default {
      name: 'FilmInLibrary',
      
      props: {
        filmInLibraryProp: Object
      },
      computed: {
      ...mapGetters(['getFilmInLibrary'])
      },
      data() {
        return {
          filmImageUrl: 'https://image.tmdb.org/t/p/w154',
          clicked: false
        }
      },
      mounted() {
        this.filmImageUrl = 'https://image.tmdb.org/t/p/w154'.concat(this.filmInLibraryProp.film.imageUrl);
        //alert(this.filmImageUrl);
      },
      methods: {
        ...mapActions(['fetchFilmInLibrary']),
        ...mapActions(['fetchFilm']),
        
        navigateToFilmDetailPage() {
            const data = {
                userId: this.filmInLibraryProp.serviceUser.userId, 
                filmId: this.filmInLibraryProp.film.filmId
            }
          this.fetchFilmInLibrary(data).then(() => {
           this.fetchFilm(this.filmInLibraryProp.film.filmId);
            this.$router.push({ name: 'filmDetails', params: { id: this.filmInLibraryProp.film.filmId } });
          });
        }
      }
    }
  
  </script>
  
  <style scoped>
    .filmInLibrary {
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
        height: 20vw;
        font-family: 'Century Gothic', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    h1{
        text-align: center;
    }

     /* Add styles for mouse hover */
  .filmInLibrary:hover {
    cursor: pointer; /* Change cursor to pointer */
    box-shadow: 0px 0px 10px #ccc; /* Add shadow */
    transform: scale(1.05); /* Scale up the card slightly */
  }

  /* Add styles for mouse click */
  .filmInLibrary.clicked {
    transform: scale(0.95); /* Scale down the card slightly */
    border-color: #007bff; /* Change border color */
  }

  
  </style>