<template>
  <v-layout align-content-start align-center column>
    <!-- <v-form v-model="valid"> -->
    <v-flex  xs12 sm12 md8 lg12 class="white elevation-2">
        <v-toolbar flat dense color="secondary" dark>
          <v-toolbar-title>Book A Car</v-toolbar-title>
        </v-toolbar>
        <v-flex xs12 md8 lg12 class="pt-2">
            <datetime
              type="datetime"
              placeholder="Start Date and Time"
              :minute-step="15"
              :min-datetime="minStartDatetime"
              v-model="beginDate"
              v-on:close="minEndDatetime = beginDate"
              input-id="startDate"
            >
              <label for="startDate" slot="before">
                <v-icon>access_time</v-icon>
              </label>
            </datetime>
        </v-flex>
        <v-flex>
          <div>
            <datetime
              type="datetime"
              placeholder="End Date and Time"
              :minute-step="15"
              :min-datetime="minEndDatetime"
              v-model="endDate"
              input-id="endDate"
            >
              <label for="endDate" slot="before">
                <v-icon>access_time</v-icon>
              </label>
            </datetime>
          </div>
        </v-flex>
        <v-flex class="pl-3">
          <v-select
            :items="cars"
            item-text="nickName"
            item-value="id"
            v-model="car"
            label="Car"
            prepend-icon="directions_car"
            single-line
            return-object
          ></v-select>
        </v-flex>
        <!-- Todo: Use location api later? -->
        <v-flex class="pl-3">
          <v-text-field
            label="Location"
            prepend-icon="place"
            v-model="location"
            :rules="[required]"
          ></v-text-field>
        </v-flex>
        <v-flex class="pl-3">
          <v-text-field
            label="Reason"
            prepend-icon="chrome_reader_mode"
            v-model="reason"
            :rules="[required]"
          ></v-text-field>
        </v-flex>
        <v-flex md6 align-content-center>
          <v-btn color="primary" @click="createRequest">Request Car</v-btn>
        </v-flex>
      </v-flex>
      <v-snackbar v-model="snackbar" :bottom="true" :multi-line="true" :timeout="6000">
        {{ notificationText }}
        <v-btn color="secondary" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <!-- </v-form> -->
    <!-- </v-flex> -->
  </v-layout>
</template>

<script>
import CarService from '@/services/CarService'
import RequestService from '@/services/RequestService'
export default {
  name: 'CarRequest',
  data() {
    return {
      minStartDatetime: new Date().toISOString(),
      minEndDatetime: new Date().toISOString(),
      beginDate: null,
      endDate: null,
      location: null,
      reason: null,
      car: null,
      cars: [{ nickName: 'Please select a date range', id: 0 }],
      valid: false,
      required: value => !!value || '',
      snackbar: false,
      notificationText: ''
    }
  },
  watch: {
    beginDate: function(beginDate) {
      this.getCarsWhenDateSelected()
    },
    endDate: function(endDate) {
      this.getCarsWhenDateSelected()
    }
  },
  methods: {
    getCarsWhenDateSelected() {
      if (this.beginDate && this.endDate) {
        this.getCars()
      }
    },
    async getCars() {
      try {
        const response = await CarService.getCarsByDateRange(
          this.beginDate,
          this.endDate
        )
        if (response.data !== []) {
          this.cars = response.data
        } else {
          this.notify('No Cars Available')
          this.cars = [
            { nickName: 'No cars available for that date range', id: 0 }
          ]
        }
      } catch (error) {
        this.notify('Error finding cars')
        console.log(error.response.data.error)
      }
    },
    notify(text) {
      this.notificationText = text
      this.snackbar = true
    },
    async createRequest() {
      // check if everything is valid
      if (!this.endDate || !this.beginDate || this.endDate === this.beginDate) {
        this.notify('You must select a valid date range')
        return
      }
      if (!this.car || this.car.id === 0) {
        this.notify('You must select a valid car')
        return
      }
      if (!this.reason) {
        this.notify('You must give a valid reason')
        return
      }
      if (!this.location) {
        this.notify('You must give a valid location')
        return
      }

      const request = {
        startTime: this.beginDate,
        finishTime: this.endDate,
        location: this.location,
        reason: this.reason,
        CarId: this.car.id,
        UserId: this.$store.state.user.id
      }

      try {
        await RequestService.createPendingRequest(request)
        // todo: notify of success
        // this.notify(`You have successfully requested {{this.car.nickName}}`)
        this.$router.push({
          name: 'Login'
          // name: 'Request'
        })
      } catch (error) {
        this.notify(`This request could not be made`)
        console.log('error', error)
      }
    }
  }
}
</script>
<style>
.dates {
  border-bottom: 1px solid gray;
}
</style>
