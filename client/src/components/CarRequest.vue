<template>
  <v-form v-model="valid">
    <v-layout column>
      <h1>Book A Car</h1>
      <v-flex xs11 md4>
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
      <v-flex xs6 md4>
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
      </v-flex>
      <v-flex xs6 md4>
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
      <v-flex xs12 sm6 md4>
        <v-text-field label="Location"
        prepend-icon="place"
        v-model="location"
        :rules="[required]">
        </v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field
          label="Reason"
          prepend-icon="chrome_reader_mode"
          v-model="reason"
          :rules="[required]"
        ></v-text-field>
      </v-flex>
      <v-flex md4>
        <v-btn color="primary" @click="createRequest">Request Car</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import CarService from '@/services/CarService'
export default {
  name: 'CarRequest',
  data() {
    return {
      minStartDatetime: new Date().toISOString(),
      minEndDatetime: new Date().toISOString(),
      menuEndDate: false,
      beginDate: null,
      endDate: null,
      location: null,
      reason: null,
      car: null,
      cars: [{ nickName: 'Please select a date range', id: 0 }],
      valid: false,
      required: value => !!value || ''
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
          // Todo: Use snackbar
          console.log('No Cars Available')
          this.cars = [
            { nickName: 'No cars available for that date range', id: 0 }
          ]
        }
      } catch (error) {
        // Todo: Use snackbar
        console.log(error.response.data.error)
      }
    },
    async createRequest() {
      // check if everything is valid
      if (!this.endDate || !this.beginDate) {
        // Todo Use snackbar
        console.log('You must select a valid date range')
        return
      }
      if (!this.car || this.car.id === 0) {
        // Todo Use snackbar
        console.log('You must select a valid car')
        return
      }
      if (!this.reason) {
        // Todo Use snackbar
        console.log('You must give a valid reason')
        return
      }
      if (!this.location) {
        // Todo Use snackbar
        console.log('You must give a valid location')
        return
      }

      console.log('next')
      // try {
      //   await RequestService.create()
      //   this.$router.push({
      //     name: 'Home'
      //     // name: 'Request'
      //   })
      // } catch (error) {
      //   console.log('error', error)
      // }
    }
  }
}
</script>
<style>
.dates {
  border-bottom: 1px solid gray;
}
</style>
