<template>
    <div>
      <Header/>
      <UserProfile/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Header from '@/components/Header.vue'
  import UserProfile from '@/components/UserProfile.vue'
  
  export default {
    name: 'UserProfileView',
    components: {
        Header,
        UserProfile
    }
  }
  </script>
  