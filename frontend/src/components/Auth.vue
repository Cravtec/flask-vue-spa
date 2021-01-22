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

      <div class="form-cntrol" v-if="mode=='register'">
        <label for="confirm_password">Confirm Password</label>
        <input type="password" id="confirm_password" v-model.trim="confirm_password"/>
      </div>
      <p v-if="password != confirm_password && mode ==='register'">Password do not match</p>
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
      confirm_password: '',
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
          this.$router.replace('/about')
        } else if (this.password === this.confirm_password) {
          await this.$store.dispatch('register', actionPayload)
          this.switchAuthMode()
        } else {

        }
      } catch (err) {
        this.error = err.message || 'Failed to authenticate!'
      }
    },
    switchAuthMode () {
      if (this.mode === 'login') {
        this.mode = 'register'
        this.username = ''
        this.password = ''
      } else {
        this.mode = 'login'
        this.username = ''
        this.password = ''
      }
    }
  }
}
</script>