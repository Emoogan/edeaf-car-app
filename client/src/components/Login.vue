<template>
  <v-layout column>
    <v-flex>
      <div class="white elevation-2">
        <v-toolbar flat dense color="secondary" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field name="username" v-model="username" label="Username"></v-text-field>
          <v-text-field name="password" type="password" v-model="password" label="Password"></v-text-field>
          <div v-html="error" class="danger-alert"/>
          <br>
          <v-btn class="secondary" dark @click="login">Login</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Login',
  data() {
    return {
      password: '',
      username: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          password: this.password,
          username: this.username
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'CarRequest'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
