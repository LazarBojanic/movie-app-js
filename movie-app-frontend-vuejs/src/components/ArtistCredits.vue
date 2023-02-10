<template>
  <div class="bg-color">
    <div class="artist-credits container font-gothic">
    <h2>{{ getArtist.artistName }}</h2>
    <img v-if="getArtist.imageUrl" :src="artistImageUrl" />
    
    <p v-else>Image not available</p>
    <br/>
    <br/>
    <table class="table table-on-top">
      <thead>
        <tr>
          <th>Film Title</th>
          <th>Year</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="credit in this.getArtistCredits" :key="credit.film.filmId">
          <td>{{ credit.film.title }}</td>
          <td>{{ credit.film.releaseYear }}</td>
          <td>{{ credit.crewMemberRole }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
  
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Cookies from 'js-cookie'
export default {
  name: 'ArtistCredits',
  computed: {
      ...mapGetters([ 'getArtist' ]),
      ...mapGetters([ 'getArtistCredits' ]),
      artistImageUrl() {
          return 'https://image.tmdb.org/t/p/w154' + this.getArtist.imageUrl;
    }
  },
  data(){
      return{
      }
  },
  mounted() {
    this.fetchArtistCredits(this.getArtist.id);
  },
  methods:{
    ...mapActions([ 'fetchArtistCredits' ]),
  }
}
</script>

<style scoped>
.artist-credits {
  margin-top: 10px;
  border-style: solid;
  border-color: black;
  border-radius: 3px;
  display: inline-block;
  font-size: 2em; /* increase the font size */
  color: rgb(64, 212, 238); /* change the text color */
  font-weight: bold;
  text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
  box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;

  font-family: 'Century Gothic', sans-serif;
}
img{
      box-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1, 2px 2px #17009c, 3px 3px #02008b, 4px 4px #001ea1;
    }
td, th {
    padding: 10px;
}
table {
    border-spacing: 10px;
}
.table-on-top {
  z-index: 2;
  background-color: white;
}
.bg-color {
    background-color: #2c3e50 !important;
    z-index: 1;
}
  tbody{
      color: rgb(226, 100, 216) !important;
    }
    thead{
      color: rgb(68, 0, 255) !important;
    }
</style>
