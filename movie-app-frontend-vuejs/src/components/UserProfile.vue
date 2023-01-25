<template>
    <div class="user-profile container font-gothic">
      <div class="user-details">
        <p v-if=this.getUser>{{ this.getUser.username }}</p>
        <p v-if=this.getUser>Email: {{ this.getUser.email }}</p>
      </div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav d-flex justify-content-start">
            <li class="nav-item mr-3 spacing">
                <button class="btn btn-primary" @click="switchToLibrary">Library</button>
            </li>
            <li class="nav-item spacing">
                <button class="btn btn-primary" @click="switchToFilmLists">Film Lists</button>
            </li>
            </ul>
        </div>
        </nav>
      <component v-bind:is="currentComponent"></component>
    </div>  
  </template>
  <script>
  import { mapState, mapActions, mapGetters } from "vuex";
  import Library from '@/components/Library.vue'
  import FilmLists from '@/components/FilmLists.vue'
  export default {
    
    name: "UserProfile",
    computed: {
      ...mapGetters(["getUser"]),
    },
    data() {
      return {
        currentComponent: 'library'
      };
    },
    mounted() {
      this.fetchUser();
    },
    methods: {
      ...mapActions(["fetchUser"]),
      switchToLibrary(){
        this.currentComponent = 'library';
      },
      switchToFilmLists(){
        this.currentComponent = 'film-lists';
      }
    },
    components:{
     'library': Library,
     'film-lists': FilmLists
    }
  };
  </script>
  <style scoped>
.user-profile {
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
    text-align: left;
}
.spacing{
    padding: 5px;
}
.user-details {
padding: 20px;
}

td, th {
padding: 10px;
}
table {
border-spacing: 10px;
}
.table-on-top {
z-index: 1;
background-color: white;
}
</style>