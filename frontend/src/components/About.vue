<template>
  <div>
    <p>About</p>
    <div v-if="isLoggedIn">
      <p>cntent visible only for:</p>
      <p>logged in users</p>
      <table>
      <tr><h3>Login table:</h3></tr>
      <tr>
        <th>Username</th>
        <th>last login</th>
      </tr>
        <tr v-for="audit in auditList" v-bind:key="auditList">
          <td>{{ audit.username }}</td>
          <td>{{ audit.last_login }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
    }
  },
  data () {
    return {
      auditList: 0
    }
  },
  created () {
    this.auditList = this.getUserAudit()
  },
  methods: {
    getUserAudit () {
      const path = `http://localhost:5000/api/audit`
      axios.get(path)
      .then(response => {
        this.auditList = response.data.users
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>