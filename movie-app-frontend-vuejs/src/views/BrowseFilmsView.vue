<template>
  <div id="app">
    <Header :title = "title"/>
    <p>
      <button @click="previousPage()">Previous</button>
      <span>...</span>
      <button @click="nextPage()">Next</button>
    </p>
    <Films v-if="filmIds" :objects="filmIds.slice(currentPage * 50, (currentPage + 1)  * 50)"/>
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
      title: "Movie App",
      currentPage: 0,
      filmIds: []
    }
  },

  mounted(){
    this.filmIds = [];
    const token = Cookies.get('token');
    fetch('http://localhost:8000/api/film/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
    .then(res => res.json())
    .then(res => {
      res.forEach((film) =>  {
        this.filmIds.push(film.id);
      });
    });
  },

  methods: {
    previousPage(){
      if(this.currentPage > 0){
        this.currentPage--;
      }
    },
    nextPage(){
      if(this.currentPage + 10 < this.filmIds.length){
        this.currentPage++;
      }
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
