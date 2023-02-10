<template>
    <div>
      <button @click="removeFilmFromLibraryButton" class="btn btn-danger">-</button>
      <div class="filmInLibrary" @click="navigateToPersonalFilmPage" @mousedown="clicked = true" @mouseup="clicked = false" :class="{'clicked': clicked }">
        <br/>
        <h1 v-if="filmInLibraryProp">{{ filmInLibraryProp.film.title }}</h1> 
        <img  v-if="filmInLibraryProp.film.imageUrl" :src=filmImageUrl />
        <p v-else>Image not available</p>
        <h1 v-if="filmInLibraryProp">{{ filmInLibraryProp.film.releaseYear }}</h1>
        <br/>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import Cookies from 'js-cookie'
  import jwtDecode from 'jwt-decode';
    export default {
      name: 'FilmInLibrary',
      
      props: {
        filmInLibraryProp: Object
      },
      computed: {
      ...mapGetters(['getFilmInLibrary']),
      ...mapGetters(['getFilm'])
      },
      data() {
        return {
          filmImageUrl: 'https://image.tmdb.org/t/p/w154',
          clicked: false
        }
      },
      mounted() {
        this.filmImageUrl = 'https://image.tmdb.org/t/p/w154'.concat(this.filmInLibraryProp.film.imageUrl);
      
      },
      methods: {
        ...mapActions(['fetchFilmInLibrary']),
        ...mapActions(['fetchFilm']),
        ...mapActions(['removeFilmFromLibrary']),
        
        navigateToPersonalFilmPage() {
           /* const data = {
                userId: this.filmInLibraryProp.serviceUser.userId, 
                filmId: this.filmInLibraryProp.film.filmId
            }
          this.fetchFilmInLibrary(data).then(() => {
           this.fetchFilm(this.filmInLibraryProp.film.filmId);
            this.$router.push({ name: 'filmDetails', params: { id: this.filmInLibraryProp.film.filmId } });
          });*/
          this.fetchFilm(this.filmInLibraryProp.film.filmId).then(() => {
            const decodedToken = jwtDecode(Cookies.get('token'));
            const filmInLibraryData = {
              userId: decodedToken.id,
              filmId: this.getFilm.id,
            }
            this.fetchFilmInLibrary(filmInLibraryData).then(() => {
              this.$router.push({ name: 'personalFilm' });
            })
          })
        },
        removeFilmFromLibraryButton(){
          console.log(this.filmInLibraryProp);
          this.removeFilmFromLibrary(this.filmInLibraryProp.id).then(() => {
            console.log('removed film');
          })
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
        text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
        width: 15vw;
        height: 20vw;
        font-family: 'Century Gothic', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgb(133, 88, 145);
        box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;

    }
    img{
      box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
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