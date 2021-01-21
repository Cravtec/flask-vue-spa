export default {
  setUser (state, payload) {
    state.username = payload.username
    state.accessToken = payload.accessToken
    state.refreshToken = payload.refreshToken
  }
}
