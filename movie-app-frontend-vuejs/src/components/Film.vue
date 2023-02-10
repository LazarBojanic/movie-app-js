<template>
    <div>
      <div class="film" @click="navigateToFilmDetailPage" @mousedown="clicked = true" @mouseup="clicked = false" :class="{'clicked': clicked }">
        
        <h3>{{ film.title }}</h3>
        <br/>
        <img v-if="film.imageUrl" :src=filmImageUrl />
        <p v-else>Image not available</p>
        <h3>Rating: {{ film.rating }}</h3>
        <h3>Year: {{ film.releaseYear }}</h3>
        
      </div>
      
      
      <button @click="addFilmToLibraryButton" class="btn btn-primary">+</button>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Cookies from 'js-cookie';
  import jwtDecode from 'jwt-decode';
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
        ...mapActions(['fetchFilm']),
        ...mapActions(['addFilmToLibrary']),
        navigateToFilmDetailPage() {
          this.fetchFilm(this.film.id).then(() => {
            this.$router.push({ name: 'filmDetails', params: { id: this.film.id } });
          });
        },
        addFilmToLibraryButton() {
          const data = {
            serviceUserId: jwtDecode(Cookies.get('token')).id,
            filmId: this.film.id
          }
          this.addFilmToLibrary(data).then(() => {
            console.log('added film to library');
          });
        }
      }
    }
  
  </script>
  
  <style scoped>
    .film {
      margin-top: 25px;
      border-style: solid;
      border-color: black;
      border-radius: 3px;
      display: inline-table;
      font-size: 2em; /* increase the font size */
      color: rgb(64, 212, 238); /* change the text color */
      font-weight: bold;
      text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
      box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
      width: 15vw;
      height: 26vw;
      font-family: 'Century Gothic', sans-serif; 
      background-color: rgb(94, 53, 148);
    }
    img{
      box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;

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
  button{
    font-weight: bold;
    display: inline-flex;
  }

  
  </style>