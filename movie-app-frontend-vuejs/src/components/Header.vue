
<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
    name: 'Header',
    
    props: {
      title: String
    }
  }
</script>


<style scoped>
  h1{
    color:rgb(154, 58, 218);
    font-weight: bold;
    text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1;
    font-family: 'Century Gothic', sans-serif;
  }
</style>
