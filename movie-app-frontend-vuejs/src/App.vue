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
          <li v-if="this.userRole == 'guest'" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="this.userRole == 'guest'" class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li v-if="this.userRole != 'guest'" class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logoutButton">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <br/>
    <body>
      <router-view @loginSuccess="updateToken" />
    </body>
    
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode';
import router from './router';
export default {
   data() {
      return {
         token: Cookies.get('token'),
         userRole: jwtDecode(token).userRole
      }
   },
   
    methods:{
      ...mapActions(["logout"]),
      logoutButton(){
        this.logout().then(() => {
          this.updateToken(Cookies.get('token'));
          router.push({name: 'login'});
        })
      },
      updateToken(token) {
        this.token = token;
        this.userRole = jwtDecode(this.token).userRole
      }
    },
    watch: {
      token(newToken){
        this.token = newToken;
        this.userRole = jwtDecode(this.token).userRole;
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
  margin-top: 10px !important;
  /*background-image: url('@/assets/background.jpg');
  background-size: cover;*/

}


#nav {
  padding: 10px !important;
}

#nav a{
  font-weight: bold;
  padding: 10px !important;
  color: #2c3e50;
}

#nav a.router-link-exact-active{
  color: #42b983;
}
body{
  background-color: #2c3e50 !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 100%;
  background-repeat: repeat;
  background-size: auto;
}

</style>
