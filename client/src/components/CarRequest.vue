<template>
<v-form v-model="valid">
  <v-layout column>
    <h1>Book A Car</h1>

    <v-flex xs11 md4 @click="log()">
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
        item-text="nick_name"
        item-value="id"
        v-model="car"
        label="Select Car"
        prepend-icon="directions_car"
        single-line
        return-object
      ></v-select>
    </v-flex>
    <!-- Todo: Use location api later? -->
    <v-flex xs12 sm6 md4>
      <v-text-field label="Location" placeholder="Enter Location" v-model="location"></v-text-field>
    </v-flex>

    <v-flex xs12 sm6 md4>
      <v-text-field label="Reason" placeholder="Reason for using car" v-model="reason"></v-text-field>
    </v-flex>

<v-flex md4>
    <v-btn color="primary">Request Car</v-btn>
</v-flex>

  </v-layout>
</v-form>
</template>

<script>
// import CarsService from '@/services/CarsService'
export default {
  name: 'CarRequest',
  data() {
    return {
      minStartDatetime: new Date().toISOString(),
      minEndDatetime: new Date().toISOString(),
      beginDate: '',
      endDate: '',
      location: '',
      reason: '',
      car: null,
      cars: null,
      valid: false
    }
  },
  mounted() {
    // this.getCars()
  },
  methods: {
    log() {
      console.log('minStart', this.minStartDatetime)
      console.log('minEnd', this.minEndDatetime)
      console.log('beginDate', this.beginDate)
    }
    // async getCars() {
    //   const response = await CarsService.fetchCars()
    //   this.cars = response.data
    //   console.log('cars', this.cars)
    // },
    // requestCar() {
    //   // Add validators
    //   console.log('Clicked')
    // }
  }
}
</script>
<style>
/* .dates {
border: solid 1px #ddd;
} */
</style>
