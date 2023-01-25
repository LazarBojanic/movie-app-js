<template>
  <div class="bg-color">
    <div class="artist-credits container font-gothic">
    <h2>{{ getArtist.artistName }}</h2>
    <img v-if="getArtist.imageUrl" :src="artistImageUrl" />
    <p v-else>Image not available</p>
    <table class="table table-striped table-on-top">
      <thead>
        <tr>
          <th>Film Title</th>
          <th>Year</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="credit in artistCredits" :key="credit.film.id">
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
      ...mapGetters([
          'getArtist'
      ]),
      artistImageUrl() {
          return 'https://image.tmdb.org/t/p/w154' + this.getArtist.imageUrl;
    }
  },
  data(){
      return{
          artistCredits: []
      }
  },
  mounted() {
    //this.$store.dispatch('fetchArtist', this.$route.params.id);
    const token = Cookies.get('token');
    fetch('http://localhost:8000/api/credit/getAllByArtistId/'.concat(this.getArtist.id), {
      headers: {
          'Authorization': `Bearer ${token}`
      }})
      .then(res => res.json())
      .then(res => {
          this.artistCredits = res;
          this.populateArtistCreditsList();
      });
  },
  methods:{
      populateArtistCreditsList(){
          // Do something
      }
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
  text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1;
  font-family: 'Century Gothic', sans-serif;
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
</style>
