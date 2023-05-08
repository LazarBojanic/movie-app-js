<template>
    <div class="personal-film">
      <h2 v-if="this.getFilmInLibrary">{{ this.getFilmInLibrary.film.title }}</h2>
      <img v-if="this.getFilmInLibrary" :src="filmImageUrl" />
      <p v-else>Image not available</p>
      <h3 v-if="this.getFilmInLibrary">Rating: {{ this.getFilmInLibrary.film.rating }}</h3>
      <h3 v-if="this.getFilmInLibrary">{{ this.getFilmInLibrary.film.releaseYear }}</h3>
      <label>Review:</label>
      <form>
            <textarea v-model="filmReview"></textarea>
            <label>
            <input type="checkbox"  @change="changeHeartColor" :class="heartClass" style="display:none;"/>
            <i class="fas fa-heart" :class="heartClass"></i>
            </label>
            <button class="btn btn-primary" @click.prevent="submitReviewButton">Submit Review</button>
        </form>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Cookies from 'js-cookie'
  import jwtDecode from 'jwt-decode';
  import io from 'socket.io-client';
  import Joi from 'joi-browser';
  
  export default {
    name: 'PersonalFilm',
    data(){
      return{
        checkboxValue: '',
        filmReview: ''
      }
    },
    methods: {
        ...mapActions(["submitReview"]),
   
      submitReviewButton() {
        const socket = io('http://95.180.97.206:8000');
        socket.emit('message');
         const data = {
            id: this.getFilmInLibrary.id,
            filmId: this.getFilmInLibrary.film.filmId,
            serviceUserId: this.getFilmInLibrary.serviceUser.userId,
            liked: this.checkboxValue,
            watched: 'Yes',
            reviewed: 'Yes',
            review: this.filmReview
         }
        const schema = Joi.object({
            id: Joi.number().required(),
            filmId: Joi.number().required(),
            serviceUserId: Joi.number().required(),
            liked: Joi.string().required(),
            watched: Joi.string().required(),
            reviewed: Joi.string().required(),
            review: Joi.string().allow(null, ''),
        });
        const { error } = schema.validate({id: data.id, filmId: data.filmId, serviceUserId: data.serviceUserId, 
            liked: data.liked, watched: data.watched, reviewed: data.reviewed, review: data.review});
        if (error) {
            console.log(error);
            return;
        }

        this.submitReview(data).then(() => {
            console.log('review submited successfully');
        });
      },
      changeHeartColor() {
        if(this.checkboxValue == 'Yes'){
            this.checkboxValue = 'No';
        }
        else if(this.checkboxValue == 'No'){
            this.checkboxValue = 'Yes';
        }
        
        console.log(this.checkboxValue);
      },
    },
    computed: {
      ...mapGetters([ 'getFilm' ]),
      ...mapGetters([ 'getFilmInLibrary' ]),
      ...mapGetters([ 'getFilmInList' ]),
    filmImageUrl() {
      return 'https://image.tmdb.org/t/p/w154' + this.getFilm.imageUrl;
    },
    heartClass() {
        if(this.checkboxValue == 'Yes'){
            return 'red-heart';
        }
        if(this.checkboxValue == 'No'){
            return '';
        }
    }
  },
  mounted() {
    if(this.getFilmInLibrary.liked == 'Yes'){
        this.checkboxValue = 'Yes';
    }
    if(this.getFilmInLibrary.liked == 'No'){
        this.checkboxValue = 'No';
    }
    this.filmReview = this.getFilmInLibrary.review || '';
  }
}
</script>

<style scoped>

  .personal-film {
    color: aqua;
    margin-top: 10px;
    border-style: solid;
    border-color: black;
    border-radius: 3px;
    display: inline-table;
    font-size: 2em; /* increase the font size */
    color: rgb(64, 212, 238); /* change the text color */
    font-weight: bold;
    text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
    font-family: 'Century Gothic', sans-serif;
    box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
    background-color: rgb(133, 88, 145);

  }
  img{
      box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
    }
  tbody{
    color: rgb(226, 100, 216) !important;
  }
  /* add css class for the heart icon */
  .red-heart {
      color: red;
    }
  .transparent {
    color: transparent;
    text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
  }
</style>