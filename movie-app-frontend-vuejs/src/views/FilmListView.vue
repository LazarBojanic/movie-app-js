<template>
    <div>
      <Header :title = "title"/>
      <FilmList/>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'
  import FilmList from '@/components/FilmList.vue'
  
  import Cookies from 'js-cookie'
  
  export default {
    name: 'FilmListView',
    components: {
      Header,
      FilmList
    },
    data(){
      return{
        title: "Film List"
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
  