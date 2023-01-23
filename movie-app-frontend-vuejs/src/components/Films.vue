<template>
  <div>
    <Film v-for="film in films" :key="film.id" :film="film"/>
    
  </div>
</template>

<script>
  import Film from '@/components/Film.vue';

  export default {
    name: 'Films',

    components: {
      Film
    },

    data() {
      return {
        films: []
      }
    },
    
    props: {
      objects: Array
    },

    watch: {
      
      objects(nVal, oVal) {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZDoiOjEsImVtYWlsIjoiYWRtaW4iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjc0NDU3MDk3LCJleHAiOjE2NzQ0NjQyOTd9.EaImShnjNCYz7NScehYs4Ky7FoWpaO0L93wkmM1IXWs';

        this.films = [];

        nVal.map( obj => {
          fetch(`http://localhost:8000/api/film/get/${obj}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
            .then( obj => obj.json())
              .then( res => this.films.push(res));
        });
      }
    },

    mounted() {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZDoiOjEsImVtYWlsIjoiYWRtaW4iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjc0NDU3MDk3LCJleHAiOjE2NzQ0NjQyOTd9.EaImShnjNCYz7NScehYs4Ky7FoWpaO0L93wkmM1IXWs';

      this.objects.map( obj => {
        fetch(`http://localhost:8000/api/film/get/${obj}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }})
          .then( obj => obj.json())
            .then( res => this.films.push(res));
      });
    }
  }

</script>

<style scoped>

</style>