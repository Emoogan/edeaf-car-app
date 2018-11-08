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
          <v-flex row>
          <!-- Approve Button -->
          <v-btn
            v-if="$store.state.user.role === 'Admin'"
            color="secondary"
            @click="approveRequest(request.id)"
          >Approve</v-btn>
          <!-- Deny Button -->
          <v-dialog
            ref="dialog"
            v-if="$store.state.user.role === 'Admin'"
            v-model="denyDialog"
            :return-value.sync="statusReason"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-btn slot="activator" color="primary" dark>Deny</v-btn>
            <v-card>
              <v-toolbar dark color="accent">
                <v-btn icon dark @click.native="denyDialog = false">
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Deny Request</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <br>
              <v-subheader>Please enter a reason for denying the request:</v-subheader>
              <v-textarea name="input-2-1" label="Reason" v-model="statusReason"></v-textarea>
              <br>
              <v-btn color="secondary" @click.native="save(statusReason, request.id)">Save</v-btn>
            </v-card>
          </v-dialog>
          <!-- Cancel Button -->
          <v-btn
            v-if="$store.state.user.id === request.UserId"
            color="accent"
            @click="cancelRequest(request.id)"
          >Cancel</v-btn>
          </v-flex>
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
      requests: [],
      denyDialog: false,
      statusReason: ''
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
    },
    async save(statusReason, requestId) {
      await this.denyRequest(requestId, statusReason)
      this.denyDialog = false
    },
    async cancelRequest(requestId) {
      try {
        await RequestService.setStatus(requestId, 'Cancelled', null)
        // set status via notifier
        await this.getRequests()
      } catch (error) {
        // todo: global notifier
        console.log(error)
      }
    },
    async approveRequest(requestId) {
      try {
        await RequestService.setStatus(requestId, 'Approved', null)
        // set status via notifier
        await this.getRequests()
      } catch (error) {
        // todo: global notifier
        console.log(error)
      }
    },
    async denyRequest(requestId, statusReason) {
      try {
        await RequestService.setStatus(requestId, 'Denied', statusReason)
        // set status via notifier
        await this.getRequests()
      } catch (error) {
        // todo: global notifier
        console.log(error)
      }
    },
    async getRequests() {
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
  },
  async mounted() {
    this.getRequests()
  }
}
</script>
