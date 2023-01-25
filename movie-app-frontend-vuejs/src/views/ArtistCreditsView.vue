<template>
    <div id="app">
      <Header :title = "title"/>
      <ArtistCredits/>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'
  import ArtistCredits from '@/components/ArtistCredits.vue'
  
  
  export default {
    name: 'ArtistCreditsView',
    components: {
      Header,
      ArtistCredits
    },
    data(){
      return{
        title: "Artist Credits"
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
  