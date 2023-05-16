<template>
    <div>
      <Header :title = "title"/>
      <PersonalFilm/>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'
  import PersonalFilm from '@/components/PersonalFilm.vue'
  
  
  export default {
    name: 'PersonalFilmView',
    components: {
      Header,
      PersonalFilm
    },
    data(){
      return{
        title: "Personal Film"
      }
    },
  
    mounted(){
      
    },
  
    methods: {
     
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  