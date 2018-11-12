<template>
  <v-toolbar fixed color="primary" dark>
    <img class="logo" src="@/assets/edeafLogo.jpg" alt="">
    <v-toolbar-title class="mr-4 hidden-sm-and-down">
      <router-link tag="span" class="home" :to="{name: 'Home'}">eDeaf Fleet Management System</router-link>
    </v-toolbar-title>
    <v-toolbar-title
      v-if="$store.state.isUserLoggedIn"
      flat
    >{{$store.state.user.username}} ({{$store.state.user.office}})</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        v-for="item in routes"
        :key="item.name"
        :to="item.link"
        v-if="item.show === $store.state.isUserLoggedIn"
        flat
      >{{ item.name }}</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" flat @click="logout()">Log Out</v-btn>
    </v-toolbar-items>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-menu class="hidden-md-and-up">
      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
      <v-list>
        <v-list-tile v-for="item in routes" :key="item.name" :to="item.link" v-if="item.show === $store.state.isUserLoggedIn">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="$store.state.isUserLoggedIn" @click="logout()">
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      routes: [
        {
          show: true,
          link: { name: 'Calendar' },
          name: 'Calendar'
        },
        {
          show: true,
          link: { name: 'CarRequest' },
          name: 'Request Car'
        },
        {
          show: true,
          link: { name: 'Request' },
          name: 'Pending requests'
        },
        {
          show: false,
          link: { name: 'Login' },
          name: 'Login'
        },
        {
          show: false,
          link: { name: 'Register' },
          name: 'Register'
        }
      ]
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
  color: 'secondary';
}

.logo {
  height: 58px;
}
</style>
