<template>
    <div class="film-detail">
      <h2>{{ this.getFilm.title }}</h2>
      <img v-if="this.getFilm.imageUrl" :src="filmImageUrl" />
      <p v-else>Image not available</p>
      <ul>
        <li>Rating: {{ this.getFilm.rating }}</li>
        <li>Release Year: {{ this.getFilm.releaseYear }}</li>
      </ul>
      <p>{{ this.getFilm.synopsis }}</p>
      <table class="table table-on-top">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crewMember in crewMembers" :key="crewMember.artist.artistId">
          <td>{{ crewMember.artist.artistName }}</td>
          <td>{{ crewMember.crewMemberRole }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Cookies from 'js-cookie'
  
  export default {
    name: 'FilmDetails',
    
    data(){
      return{
        crewMembers: []
      }
    },

    computed: {
      ...mapGetters([
            'getFilm'
        ]),
      filmImageUrl() {
        return 'https://image.tmdb.org/t/p/w154' + this.getFilm.imageUrl;
      }
    },
    watch: {
      getFilm: {
        immediate: true,
        handler() {
          const token = Cookies.get('token');
          //console.log(this.getFilm.id);
          fetch('http://localhost:8000/api/crewMember/getAllByFilmId/'.concat(this.getFilm.id), {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
            .then(res => res.json())
            .then(res => {
                this.crewMembers = res;
          });
        }
      }
    },
    mounted() {
      //this.$store.dispatch('fetchFilm', this.$route.params.id);
      /*const token = Cookies.get('token');
      fetch('http://localhost:8000/api/crewMember/getAllByFilmId/'.concat(this.getFilm.id), {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => res.json())
        .then(res => {
            this.crewMembers = res;
      });*/
    }
  }
  </script>
  
  <style scoped>
    .film-detail {
      color: aqua;
      margin-top: 10px;
      border-style: solid;
      border-color: black;
      border-radius: 3px;
      display: inline-table;
      font-size: 2em; /* increase the font size /
      color: rgb(64, 212, 238); / change the text color */
      font-weight: bold;
      text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
      font-family: 'Century Gothic', sans-serif;
    }
    tbody{
      color: rgb(226, 100, 216) !important;
    }
  </style>