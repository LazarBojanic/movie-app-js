<template>
  <div>
    <carousel :perPage="1" :navigationEnabled="true" :paginationEnabled="true">
      <slide v-for="(item, index) in items" :key="index">
        <img :src="item.image" alt="Slide Image">
      </slide>
    </carousel>
  </div>
</template>
<script>


export default {
  name: 'HomeView',
  data() {
    return {
      items: [
        { image: require('../assets/slide1.jpg') },
        { image: require('../assets/slide2.jpg')},
        { image: require('../assets/slide3.jpg')}
      ]
    }
  },
  components: {
  }
}
</script>
<style scoped>
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  .carousel-pagination {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>