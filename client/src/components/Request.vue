<template>
  <v-layout row wrap="">
    <div v-if="noRequests">No requests :(</div>
    <v-flex xs12 md3 class="pa-1" v-for="request in requests" :key="request.id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3
              class="headline mb-0 text-xs-center"
            >{{ request.User.firstName }} {{ request.User.lastName }} - {{ request.Car.nickName }}</h3>
            <div>
              <p class="text-xs-center">From: {{formatDate(request.startTime)}}</p>
              <p class="text-xs-center">To: {{formatDate(request.finishTime)}}</p>
              <p class="text-xs-center">At: {{ request.location }}</p>
              <p class="text-xs-center">For: {{ request.reason }}</p>
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn v-if="$store.state.user.role === 'Admin'" color="secondary">Approve</v-btn>
          <v-btn v-if="$store.state.user.role === 'Admin'" color="accent">Deny</v-btn>
          <v-btn v-if="$store.state.user.role !== 'Admin'" color="secondary">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import RequestService from '@/services/RequestService'
export default {
  name: 'Request',
  data() {
    return {
      noRequests: false,
      requests: []
    }
  },
  methods: {
    formatDate(dateString) {
      // expected format 2018-11-07T17:45:00.000Z
      return (
        `${dateString.substring(8, 10)}/${dateString.substring(
          5,
          7
        )}/${dateString.substring(0, 4)}` + ` ${dateString.substring(11, 16)}`
      )
    }
  },
  async mounted() {
    // if user has admin role then retrieve all pending, else return only users pending
    try {
      const response = await RequestService.getPendingRequests(
        this.$store.state.user.id
      )
      if (response.data && response.data !== []) {
        this.requests = response.data
      } else {
        this.noRequests = true
      }
    } catch (error) {
      // todo: global notifier
      console.log(error)
    }
  }
}
</script>
