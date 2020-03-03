// Not a React component, so first character in auth is lowercase
class Auth {
  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static logout() {
    localStorage.removeItem('token')
  }

  static getPayload() {
    const token = this.getToken() // try and get the token
    if (!token) return false // if its not there, return false
    const parts = token.split('.') // split it into an array
    if (parts.length < 3) return false // if there are less than three parts the token will be invalid, return false
    return JSON.parse(atob(parts[1]))
  }

  static isAuthenticated() {
    const payload = this.getPayload()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }

  static getUser() {
    const { sub } = this.getPayload()
    return sub
  }
  
}

export default Auth