<template>
    <div id="app">
      <Header :title = "title"/>
      <Artists/>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'
  import Artists from '@/components/Artists.vue'
  
  import Cookies from 'js-cookie'
  
  export default {
    name: 'BrowseArtists',
    components: {
      Header,
      Artists
    },
    data(){
      return{
        title: "Browse Artists"
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
  