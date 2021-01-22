<template>
  <div>
    <div>
      <h2>{{ submitButtonCaption }}</h2>
    </div>
    <form @submit.prevent="submitForm">
      <div class="container">
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
        <p class="warning" v-if="password != confirm_password && mode ==='register'">Password do not match</p>
        <p class="warning" v-if="!formISValid">Enter a valid username or password(no less than 3 caraters)</p>
        <div class="warning" v-show="!!error">
          <h3>An error occured</h3>
          <p>{{ error }}</p>
        </div>
        <button type="submit" class="submit">{{ submitButtonCaption }}</button>
        <p><span class="psw">{{ switchCaption }}<button type="button" @click='switchAuthMode'>{{ switchModeButtonCaption }}</button></span></p>
      </div>
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

<style>
form {border: 3px solid #f1f1f1;}

input {
  width: 100%;
  padding: 8px 5px;
  margin: 5px 2px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  text-align: center;
}

button.submit {
  background-color: #4CAF50;
  color: white;
  padding: 8px 10px;
  margin: 5px 0;
  border: none;
  cursor: pointer;
  width: 50%;
}

button.submit:hover {
  opacity: 0.8;
}

.container {
  padding: 16px;
  margin: auto;
  max-width: 400px;
}

span.psw {
  padding-top: 16px;
}

.warning {
  color: rgb(255, 255, 255);
  background-color: rgb(191 2 2);
  padding: 5px;
}
</style>