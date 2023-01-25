<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/browseFilms">Browse Films</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/browseArtists">Browse Artists</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/userProfile">Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
   data() {
      return {
         
      }
   }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Century+Gothic&display=swap');
:root {
      font-family: 'Century Gothic', sans-serif;
  }
#app {
  font-family: 'Century Gothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  /*background-image: url('@/assets/background.jpg');
  background-size: cover;*/
  background-color: #2c3e50;
  width: 100% !important;
  height: 100% !important;
}


#nav {
  padding: 30px;
}

#nav a{
  font-weight: bold;
  padding: 10px;
  color: #2c3e50;
}

#nav a.router-link-exact-active{
  color: #42b983;
}

</style>
