<template>
  <v-toolbar fixed color="primary" dark>
    <img class="logo" src="@/assets/edeafLogo.jpg" alt="">
    <v-toolbar-title class="mr-4">
      <router-link
      tag="span"
      class="home"
      :to="{name: 'Home'}">EDeaf Car Booking</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="$store.state.isUserLoggedIn" flat>Calendar</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" :to="{name: 'CarRequest'}" flat>Request Car</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" :to="{name: 'Request'}" flat>Pending requests</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" flat>Approved requests</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat :to="{name: 'Login'}">Login</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat :to="{name: 'Register'}">Register</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" flat>{{$store.state.user.username}} ({{$store.state.user.office}})</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" flat @click="logout()">Log Out</v-btn>
    </v-toolbar-items>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Login'
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
  color: "secondary";
}

.logo {
  height: 60px;
}
</style>
