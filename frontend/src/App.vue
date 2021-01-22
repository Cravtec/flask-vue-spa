<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/About">About</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/Auth">Login</router-link></li>
        <li v-if="isLoggedIn"><a @click='logout'>Logout</a> </li>
      </ul>
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
  created () {
    this.$store.dispatch('autoLogin')
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.replace('/auth')
    }
  }
}
</script>

<style>
body {
    margin: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: #35495e;
}

li {
  cursor: pointer;
  display: inline-block;
}

li a {
  display: block;
  color: white;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: rgba(34, 34, 34, 0.527);
}

#nav {
  margin: auto;
  text-align: center;
}
</style>
