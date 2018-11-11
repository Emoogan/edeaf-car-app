<template>
  <v-layout xs-center column>
    <!-- Loading -->
    <loading :value="isLoading"></loading>
    <v-flex xs4>
      <div class="white elevation-4">
        <v-toolbar flat dense class="secondary" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form name="register-form" autocomplete="off">
            <v-text-field name="username" v-model="username" label="Username"></v-text-field>
            <v-text-field name="firstName" v-model="firstName" label="First Name"></v-text-field>
            <v-text-field name="lastName" v-model="lastName" label="Last Name"></v-text-field>
            <v-select name="office" v-model="office" :items="offices" label="Office"></v-select>
            <v-text-field name="email" v-model="email" label="Email"></v-text-field>
            <v-text-field
              name="password"
              type="password"
              autocomplete="new-password"
              v-model="password"
              label="Password"
            ></v-text-field>
          </form>
          <div v-html="error" class="danger-alert"/>
          <br>
          <v-btn class="secondary" dark @click="register">Register</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Loading from '@/components/Loading.vue'
export default {
  name: 'Register',
  components: {
    Loading
  },
  data() {
    return {
      email: '',
      password: '',
      username: '',
      firstName: '',
      lastName: '',
      office: '',
      error: null,
      offices: ['Centurion', 'Durban', 'Cape Town', 'Johannesburg'],
      isLoading: false
    }
  },
  methods: {
    async register() {
      try {
        this.isLoading = true
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          username: this.username,
          lastName: this.lastName,
          firstName: this.firstName,
          office: this.office
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.isLoading = false
        this.$router.push({
          name: 'CarRequest'
        })
      } catch (error) {
        this.isLoading = false
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
