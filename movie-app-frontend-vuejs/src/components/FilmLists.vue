<template>
  <div class="bg-color">
    <div class="artist-credits container font-gothic">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="filmListNamePar">New List Name</label>
            <input type="text" class="form-control" id="filmListNamePar" v-model="filmListNamePar" placeholder="Enter film list name">
          </div>
        </div>
        <div class="col-sm-6">
          <button class="btn btn-primary" @click="createFilmListButton(filmListNamePar)">Create Film List</button>
        </div>
      </div>
      <table class="table table-on-top">
        <thead>
          <tr>
            <th>Film List Name</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="filmListObject in this.getFilmLists" :key="filmListObject.id" @click="clickFilmList(filmListObject)" @mouseover="hoverFilmList(filmListObject)" @mouseout="resetFilmList(filmListObject)" :class="{ 'clicked': filmListObject.clicked }">
            <td>{{ filmListObject.filmListName }}</td>
            <td>{{ filmListObject.averageRating }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Cookies from 'js-cookie'
  import jwtDecode from 'jwt-decode'
  export default {
    name: 'FilmLists',
    computed: {
        ...mapGetters([ 'getFilmList' ]),
        ...mapGetters([ 'getFilmLists' ])
      },
      data(){
        return{
          filmListNamePar: '',
         }
        },
    mounted() {
      //this.$store.dispatch('fetchArtist', this.$route.params.id);
      this.fetchFilmLists(jwtDecode(Cookies.get('token')).id);
      
    },
    methods:{
        ...mapActions(['fetchFilmList']),
        ...mapActions(['fetchFilmLists']),
        ...mapActions(['createFilmList']),
        clickFilmList(filmList){
            this.fetchFilmList(filmList.id).then(() => {
                //(this.getFilmList.id);
                this.$router.push({ name: 'filmList', params: { id: this.getFilmList.id } });
            })
        },
        clickFilmList(filmList){
            this.fetchFilmList(filmList.id).then(() => {
                console.log(this.getFilmList.id);
                this.$router.push({ name: 'filmList', params: { id: this.getFilmList.id } });
                filmList.clicked = true;
            })
        },
        hoverFilmList(filmList) {
            filmList.clicked = false;
        },
        resetFilmList(filmList) {
            filmList.clicked = false;
        },
        createFilmListButton(filmListNamePar){
        const decodedToken = jwtDecode(Cookies.get('token'));
          const data = {
            serviceUserId: decodedToken.id,
            filmListName: filmListNamePar,
            averageRating: 0
          }
          this.createFilmList(data);
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
  .table {
        width: 80%; /* adjust the width of the table */
        margin: 0 auto; /* center the table */
        border-spacing: 5px;
        color: rgb(165, 50, 85);
    }
    /* Add styling for zebra-striping */

    /* Adjust font-size, padding and border-spacing of <td> and <th> elements */
    td, th {
        padding: 5px; /* adjust the padding */

    }
    tr.clicked {
    background-color: #007bff;
    color:white;
    }
    tr:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }
    thead{
        color: rgb(117, 24, 126);
    }
  .bg-color {
      background-color: #2c3e50 !important;
      z-index: 1;
  }
  </style>
  