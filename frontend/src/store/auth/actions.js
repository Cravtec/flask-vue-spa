export default {
  async login (context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },

  async register (context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'register'
    })
  },

  async auth (context, payload) {
    const mode = payload.mode
    let url = 'http://127.0.0.1:5000/api/login'

    if (mode === 'register') {
      url = 'http://127.0.0.1:5000/api/registration'
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: payload.username,
        password: payload.password
      })
    })
    const responseData = await response.json()

    if (!response.ok) {
      console.log(responseData)
      const error = new Error(responseData.message || 'Failed to authenticate.')
      throw error
    }

    localStorage.setItem('username', responseData.username)
    localStorage.setItem('accessToken', responseData.access_token)

    console.log(responseData)
    context.commit('setUser', {
      username: responseData.username,
      accessToken: responseData.access_token,
      refreshToken: responseData.refresh_token
    })
  },

  autoLogin (context) {
    const accessToken = localStorage.getItem('token')
    const username = localStorage.getItem('username')

    if (accessToken && username) {
      context.commit('setUser', {
        username: username,
        accessToken: accessToken,
        refreshToken: null
      })
    }
  },

  logout (context) {
    context.commit('setUser', {
      username: null,
      accessToken: null,
      refreshToken: null
    })
  }
}
