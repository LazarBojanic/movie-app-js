<template>
    <div class="film-detail">
      <h2>{{ getFilm.title }}</h2>
      <img v-if="getFilm.imageUrl" :src="filmImageUrl" />
      <p v-else>Image not available</p>
      <h3>Rating: {{ getFilm.rating }}</h3>
      <h3>Year: {{ getFilm.releaseYear }}</h3>
      <p>{{ getFilm.synopsis }}</p>
      <h3>Studio: {{ getStudio.studioName }}</h3>
      <h3>Genre: {{ getGenre.genreName }}</h3>
      <h3>Country: {{ getCountry.countryName }}</h3>
      <table class="table table-on-top">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crewMember in getCrewMembers" :key="crewMember.artist.artistId">
          <td>{{ crewMember.artist.artistName }}</td>
          <td>{{ crewMember.crewMemberRole }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import Cookies from 'js-cookie'
  
  export default {
    name: 'FilmDetails',
    
    data(){
      return{
      }
    },

    computed: {
      ...mapGetters([ 'getFilm' ]),
      ...mapGetters([ 'getStudio' ]),
      ...mapGetters([ 'getGenre' ]),
      ...mapGetters([ 'getCountry' ]),
      ...mapGetters([ 'getCrewMembers' ]),
      filmImageUrl() {
        return 'https://image.tmdb.org/t/p/w154' + this.getFilm.imageUrl;
      }
    },
    methods:{
      ...mapActions(['fetchStudioForFilm']),
      ...mapActions(['fetchGenreForFilm']),
      ...mapActions(['fetchCountryForFilm']),
      ...mapActions(['fetchCrewMembersForFilm']),
    },
    mounted() {
          this.fetchCrewMembersForFilm(this.getFilm.id);
          this.fetchStudioForFilm(this.getFilm.studioId);
          this.fetchGenreForFilm(this.getFilm.genreId);
          this.fetchCountryForFilm(this.getFilm.countryId);
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
      box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;

      font-family: 'Century Gothic', sans-serif;
    }
    img{
      box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
    }
    tbody{
      color: rgb(226, 100, 216) !important;
    }
    thead{
      color: rgb(68, 0, 255) !important;
    }
  </style>