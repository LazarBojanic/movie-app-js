<template>
    <div>
      <Films/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Films from '@/components/Films.vue'
  
  export default {
    name: 'TestView',
    components: {
        Films
    }
  }
  </script>
  