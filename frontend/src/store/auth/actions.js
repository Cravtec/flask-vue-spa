export default {
  async login (context, payload) {
    const response = await fetch('http://127.0.0.1:5000/api/login', {
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
    console.log(responseData)
    context.commit('setUser', {
      username: responseData.username,
      accessToken: responseData.access_token,
      refreshToken: responseData.refresh_token
    })
  },
  async register (context, payload) {
    const response = await fetch('http://127.0.0.1:5000/api/registration', {
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
    console.log(responseData)
    context.commit('setUser', {
      message: responseData.message,
      accessToken: responseData.access_token,
      refreshToken: responseData.refresh_token
    })
  },
  logout (context) {
    context.commit('setUser', {
      username: null,
      accessToken: null,
      refreshToken: null
    })
  }
}
