<template>
  <div>
    <Film v-for="film in films" :key="film.id" :film="film"/>
    
  </div>
</template>

<script>
  import Film from '@/components/Film.vue';
  import Cookies from 'js-cookie'

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
        const token = Cookies.get('token');
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
      const token = Cookies.get('token');
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