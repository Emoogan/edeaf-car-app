<template>
  <v-layout xs-center column>
    <v-flex>
      <div class="white">
        <v-toolbar flat dense class="cyan" dark>
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
          <div v-html="error" class="error"/>
          <br>
          <v-btn class="cyan" dark @click="register">Register</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
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
      firstName: '',
      lastName: '',
      office: '',
      error: null,
      offices: ['Centurion', 'Durban', 'Cape Town', 'Johannesburg']
    }
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          username: this.username,
          lastName: this.lastName,
          firstName: this.firstName,
          office: this.office
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
  color: red;
}
</style>
