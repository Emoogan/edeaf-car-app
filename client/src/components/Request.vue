<template>
  <v-layout row wrap>
    <loading :value="isLoading"></loading>
    <div v-if="noRequests">No requests :(</div>
    <v-flex xs12 md3 fill-height class="pa-1" v-for="request in requests" :key="request.id">
      <v-card>
        <v-card-title primary-title>
          <v-flex column>
            <h3 class="headline mb-0 text-xs-center">{{ request.Car.nickName }}</h3>
            <h2>{{ request.User.firstName }} {{ request.User.lastName }}</h2>
            <v-flex>
              <div class="text-xs-center text-md-center">
                <b>From:</b>
                {{formatDate(request.startTime)}}
              </div>
              <div class="text-xs-center">
                <b>To:</b>
                {{formatDate(request.finishTime)}}
              </div>
              <div class="text-xs-center">
                <b>At:</b>
                {{ request.location }}
              </div>
              <div class="text-xs-center">
                <b>For:</b>
                {{ request.reason }}
              </div>
            </v-flex>
          </v-flex>
        </v-card-title>
        <v-divider light></v-divider>
        <v-card-actions>
          <v-flex row wrap>
            <!-- Approve Button -->
            <v-btn
              v-if="$store.state.user.role === 'Admin'"
              color="secondary"
              @click="approveRequest(request.id)"
            >Approve</v-btn>
            <!-- Deny Button -->
            <v-dialog
              class="px-1"
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
              class="my-1"
            >Cancel</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import RequestService from '@/services/RequestService'
import Loading from '@/components/Loading.vue'
export default {
  name: 'Request',
  components: {
    Loading
  },
  data() {
    return {
      noRequests: false,
      requests: [],
      denyDialog: false,
      statusReason: '',
      isLoading: false
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
        this.isLoading = true
        await RequestService.setStatus(requestId, 'Cancelled', null)
        this.$toasted.show('Successfully Cancelled the Request', {
          icon: 'check'
        })
        await this.getRequests()
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.$toasted.show(`Error: ${error}`, {
          icon: 'priority_high'
        })
        console.log(error)
      }
    },
    async approveRequest(requestId) {
      try {
        this.isLoading = true
        await RequestService.setStatus(requestId, 'Approved', null)
        this.$toasted.show('Successfully Approved the Request', {
          icon: 'check'
        })
        await this.getRequests()
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.$toasted.show(`Error: ${error}`, {
          icon: 'priority_high'
        })
        console.log(error)
      }
    },
    async denyRequest(requestId, statusReason) {
      try {
        this.isLoading = true
        await RequestService.setStatus(requestId, 'Denied', statusReason)
        this.$toasted.show('Successfully Denied the Request', {
          icon: 'check'
        })
        await this.getRequests()
        this.isLoading = false
      } catch (error) {
        this.$toasted.show(`Error: ${error}`, {
          icon: 'priority_high'
        })
        console.log(error)
        this.isLoading = false
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
        this.$toasted.show(`Error: ${error}`, {
          icon: 'priority_high'
        })
        console.log(error)
      }
    }
  },
  async mounted() {
    this.getRequests()
  }
}
</script>
