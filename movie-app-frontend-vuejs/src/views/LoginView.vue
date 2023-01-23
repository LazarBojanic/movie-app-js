<template>
    <div id="app">
      <Header :title = "title"/>
      <p>
        <button @click="login()">Login</button>
      </p>
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue'
  
  export default {
    name: 'LoginView',
    components: {
      Header
    },
    data(){
      return{
        title: "Login"
      }
    },
  
    mounted(){
      
    },
  
    methods: {
      login(){
        
      }
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
  