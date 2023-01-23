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
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZDoiOjEsImVtYWlsIjoiYWRtaW4iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjc0NDQ0Mjg5LCJleHAiOjE2NzQ0NTE0ODl9.ZWevWlCB5sbUCpbTDENOXqTxPY3z2s_sQLIjBkN3_qU';

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
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZDoiOjEsImVtYWlsIjoiYWRtaW4iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjc0NDQ0Mjg5LCJleHAiOjE2NzQ0NTE0ODl9.ZWevWlCB5sbUCpbTDENOXqTxPY3z2s_sQLIjBkN3_qU';

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