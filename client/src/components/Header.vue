<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <span class="home" @click="navigateTo({name: 'Home'})">EDeaf Car Booking</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="$store.state.isUserLoggedIn" flat>Calendar</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" @click="navigateTo({name: 'CarRequest'})" flat>Request Car</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" flat>Pending requests</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" flat>Approved requests</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat @click="navigateTo({name: 'Login'})">Login</v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        @click="navigateTo({name: 'Register'})"
      >Register</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" flat @click="logout()">Log Out</v-btn>
    </v-toolbar-items>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {}
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: cornflowerblue;
}
</style>
