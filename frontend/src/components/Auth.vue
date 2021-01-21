<template>
  <div>
    <div>
      <h2>{{ submitButtonCaption }}</h2>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-cntrol">
        <label for="username">Username</label>
        <input type="username" id="username" v-model.trim="username"/>
      </div>

      <div class="form-cntrol">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password"/>
      </div>
      <p v-if="!formISValid">Enter a valid username or password(no less than 3 caraters)</p>
      <div v-show="!!error">
        <h3>An error occured</h3>
        <p>{{ error }}</p>
      </div>
      <button type="submit">{{ submitButtonCaption }}</button>
      <p>{{ switchCaption }}<button type="button" @click='switchAuthMode'>{{ switchModeButtonCaption }}</button></p>
    </form>
  </div>

</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      formISValid: true,
      mode: 'login',
      error: null
    }
  },
  computed: {
    submitButtonCaption () {
      if (this.mode === 'login') {
        return 'Login'
      } else {
        return 'Register'
      }
    },
    switchModeButtonCaption () {
      if (this.mode === 'login') {
        return 'Register'
      } else {
        return 'Login'
      }
    },
    switchCaption () {
      if (this.mode === 'login') {
        return 'Don\'t have an account? '
      } else {
        return 'Already have an account? '
      }
    }
  },
  methods: {
    async submitForm () {
      if (this.username === '' || this.password.length < 3) {
        this.formISValid = false
        return
      }

      const actionPayload = {
        username: this.username,
        password: this.password
      }
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload)
        } else {
          await this.$store.dispatch('register', actionPayload)
        }
        this.$router.replace('/About')
      } catch (err) {
        this.error = err.message || 'Failed to authenticate!'
      }
    },
    switchAuthMode () {
      if (this.mode === 'login') {
        this.mode = 'register'
      } else {
        this.mode = 'login'
      }
    }
  }
}
</script>