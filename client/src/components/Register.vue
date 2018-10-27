<template>
  <div>
    <h1>Register</h1>
    <input type="text" name="username" v-model="username" placeholder="Username">
    <input type="email" name="email" v-model="email" placeholder="Email">
    <input type="password" name="password" v-model="password" placeholder="Password">
    <div v-html="error" class="error" />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      username: '',
      error: null
    }
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          username: this.username
        })
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

.error {
  color: red
}
</style>
