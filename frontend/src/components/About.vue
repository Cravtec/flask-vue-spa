<template>
  <div>
    <p>About</p>
    <div v-if="isLoggedIn">
      <p>cntent visible only for:</p>
      <p>logged in users</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>