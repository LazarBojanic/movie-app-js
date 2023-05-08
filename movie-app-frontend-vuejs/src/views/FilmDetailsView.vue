<template>
    <div id="app">
      <Header :title = "title"/>
      <FilmDetails/>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'
  import FilmDetails from '@/components/FilmDetails.vue'
  
  
  export default {
    name: 'FilmDetails',
    components: {
      Header,
      FilmDetails
    },
    data(){
      return{
        title: "Film Details"
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
  