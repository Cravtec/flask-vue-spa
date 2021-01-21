export default {
  userID (state) {
    return state.username
  },
  accessToken (state) {
    return state.accessToken
  },
  isAuthenticated (state) {
    return !!state.accessToken
  }
}
