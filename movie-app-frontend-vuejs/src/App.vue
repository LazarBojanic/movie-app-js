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
import Header from './components/Header.vue'
import Films from './components/Films.vue'

export default {
  name: 'App',
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZDoiOjEsImVtYWlsIjoiYWRtaW4iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjc0NDQ0Mjg5LCJleHAiOjE2NzQ0NTE0ODl9.ZWevWlCB5sbUCpbTDENOXqTxPY3z2s_sQLIjBkN3_qU';
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
