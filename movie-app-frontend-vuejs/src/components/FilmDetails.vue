<template>
    <div class="film-detail">
      <h2>{{ getFilm.title }}</h2>
      <img v-if="getFilm.imageUrl" :src="filmImageUrl" />
      <p v-else>Image not available</p>
      <h3>Rating: {{ getFilm.rating }}</h3>
      <h3>Year: {{ getFilm.releaseYear }}</h3>
      <p>{{ getFilm.synopsis }}</p>
      <h3>Studios:</h3>
        <h4 v-for="studio in getStudiosForFilm" :key="studio.studioId">{{ studio.studio.studioName }}</h4>
        <h3>Genres:</h3>
        <h4 v-for="genre in getGenresForFilm" :key="genre.genreId">{{ genre.genre.genreName }}</h4>
        <h3>Countries:</h3>
        <h4 v-for="country in getCountriesForFilm" :key="country.countryId">{{ country.country.countryName }}</h4>
      <table class="table table-on-top">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crewMember in getCrewMembers" :key="crewMember.id">
          <td>{{ crewMember.artist.artistName }}</td>
          <td>{{ crewMember.crewMemberRole }}</td>
          <td>{{ crewMember.characterName }}</td>
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
      ...mapGetters([ 'getStudiosForFilm' ]),
      ...mapGetters([ 'getGenresForFilm' ]),
      ...mapGetters([ 'getCountriesForFilm' ]),
      ...mapGetters([ 'getCrewMembers' ]),
      filmImageUrl() {
        return 'https://image.tmdb.org/t/p/w154' + this.getFilm.imageUrl;
      }
    },
    methods:{
      ...mapActions(['fetchStudiosForFilm']),
      ...mapActions(['fetchGenresForFilm']),
      ...mapActions(['fetchCountriesForFilm']),
      ...mapActions(['fetchCrewMembers']),
    },
    async mounted() {
          await this.fetchCrewMembers(this.getFilm.id);
          await this.fetchStudiosForFilm(this.getFilm.id);
          await this.fetchCountriesForFilm(this.getFilm.id);
          await this.fetchGenresForFilm(this.getFilm.id);
          console.log(this.getStudiosForFilm)
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