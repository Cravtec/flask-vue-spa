<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> 
      <router-link to="/About" v-if="isLoggedIn">About</router-link>
      <router-link to="/Auth" v-if="!isLoggedIn">Login</router-link>
      <button v-if="isLoggedIn" @click='logout'>Logout</button>  
    </div>
    <div>
    <img src="./assets/logo.png">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.replace('/')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
