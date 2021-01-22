<template>
  <div>
    <p>About</p>
    <div v-if="isLoggedIn">
      <p>Content is visible only for logged in users</p>
      <table id="audits">
      <tr>
        <td colspan="3"><h3>Login table:</h3></td>
      </tr>
      <tr>
        <th>Id</th>
        <th>Username</th>
        <th>last login</th>
      </tr>
        <tr v-for="(audit, i) in auditList">
          <td>{{ i+1 }}</td>
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
  data () {
    return {
      auditList: null
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
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

<style>
#audits {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#audits td, #audits th {
  border: 1px solid #ddd;
  padding: 8px;
}

#audits tr:nth-child(even){background-color: #f2f2f2;}

#audits tr:hover {background-color: #ddd;}

#audits th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>