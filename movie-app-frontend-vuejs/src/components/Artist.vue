<template>
    <div class="artist" @click="navigateToArtistDetailPage" @mousedown="clicked = true" @mouseup="clicked = false" :class="{'clicked': clicked }">      
      <img v-if="artist.imageUrl" :src=artistImageUrl />
      <p v-else>Image not available</p>  
      <ul>
        <li>{{ artist.artistName }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters } from 'vuex';
    export default {
      name: 'Artist',
      
      props: {
        artist: Object
      },
      data() {
        return {
          artistImageUrl: 'https://image.tmdb.org/t/p/w154',
          clicked: false
        }
      },
      mounted() {
        this.artistImageUrl = 'https://image.tmdb.org/t/p/w154'.concat(this.artist.imageUrl);
        //alert(this.artistImageUrl);
      },
      methods: {
        ...mapActions(['fetchArtist']),
        navigateToArtistDetailPage() {
          this.fetchArtist(this.artist.id).then(() => {
            this.$router.push({ name: 'artistCredits', params: { id: this.artist.id } });
          });
        }
      }
    }
  
  </script>
  
  <style scoped>
  
    .artist {
      margin-top: 10px;
      border-style: solid;
      border-color: black;
      display: inline-table;
      font-size: 2em; /* increase the font size */
      color: rgb(64, 212, 238); /* change the text color */
      font-weight: bold;
      text-shadow: -1px -1px 0 #000000, 1px -1px 0 #17009c, -1px 1px 0 #02008b, 1px 1px 0 #001ea1;
      width: 15vw;
      height: 17vw;
      font-family: 'Century Gothic', sans-serif;
    }

     /* Add styles for mouse hover */
  .artist:hover {
    cursor: pointer; /* Change cursor to pointer */
    box-shadow: 0px 0px 10px #ccc; /* Add shadow */
    transform: scale(1.05); /* Scale up the card slightly */
  }

  /* Add styles for mouse click */
  .artist.clicked {
    transform: scale(0.95); /* Scale down the card slightly */
    border-color: #007bff; /* Change border color */
  }

  
  </style>