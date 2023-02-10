<template>
  <div>
    <button @click="removeFilmFromFilmListButton" class="btn btn-danger">-</button>
    <div class="filmInList" @click="navigateToPersonalFilmPage" @mousedown="clicked = true" @mouseup="clicked = false" :class="{'clicked': clicked }">
      <h3 v-if="filmInListProp.film">{{ filmInListProp.film.title }}</h3>
      
      <img v-if="filmInListProp.film" :src=filmImageUrl />
      <p v-else>Image not available</p>
      
      <h3 v-if="filmInListProp.film">Rating: {{ filmInListProp.film.rating }}</h3>
      <h3 v-if="filmInListProp.film">{{ filmInListProp.film.releaseYear }}</h3>
    </div>
  </div>
    
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Cookies from 'js-cookie'
  import jwtDecode from 'jwt-decode';
    export default {
      name: 'FilmInList',
      
      props: {
        filmInListProp: Object
      },
      computed:{
        ...mapGetters(['getFilm']),
        ...mapGetters(['getFilmInList']),
        ...mapGetters(['getFilmList']),
        ...mapGetters(['getFilmInLibrary'])
      },
      data() {
        return {
          filmImageUrl: 'https://image.tmdb.org/t/p/w154',
          clicked: false
        }
      },
      mounted() {
        this.filmImageUrl = 'https://image.tmdb.org/t/p/w154'.concat(this.filmInListProp.film.imageUrl);
        
        
      },
      methods: {
        ...mapActions(['fetchFilm']),
        ...mapActions(['fetchFilmList']),
        ...mapActions(['fetchFilmInLibrary']),
        ...mapActions(['fetchFilmInList']),
        ...mapActions(['removeFilmFromFilmList']),
        navigateToPersonalFilmPage() {

          const filmInListData = {
            filmListId: this.filmInListProp.filmList.filmListId,
            filmId: this.filmInListProp.film.filmId,
          }
          this.fetchFilmInList(filmInListData).then(() => {
            this.fetchFilm(this.filmInListProp.film.filmId).then(() => {
            const filmInLibraryData = {
              userId: jwtDecode(Cookies.get('token')).id,
              filmId: this.getFilm.id,
            }
            this.fetchFilmInLibrary(filmInLibraryData).then(() => {
              this.$router.push({ name: 'personalFilm' });
              })
            })
          })

        },
        removeFilmFromFilmListButton(){
          this.removeFilmFromFilmList(this.filmInListProp.id).then(() => {
            console.log('removed film from film list');
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
      text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
      width: 15vw;
      height: 18vw;
      font-family: 'Century Gothic', sans-serif; 
      background-color: rgb(133, 88, 145);
      box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;

    }
    img{
      box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
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