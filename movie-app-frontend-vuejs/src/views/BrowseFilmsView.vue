<template>
  <div>
    <Header :title = "title"/>
    <Films/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Films from '@/components/Films.vue'

import Cookies from 'js-cookie'

export default {
  name: 'BrowseFilms',
  components: {
    Header,
    Films
  },
  data(){
    return{
      title: "Browse Films"
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
