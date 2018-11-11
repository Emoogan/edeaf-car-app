<template>
  <v-layout row wrap="">
    <v-flex fill-height d-flex xs12 md9 lg1>
      <v-calendar height="100%" :attributes="calendarDates" :formats="calendarFormats">
        <!-- POPOVER SLOT -->
        <div slot="multi-day-row" slot-scope="{customData, day}">
          {{getDateDisplay(day.date, customData.startTime, customData.finishTime)}}
          {{customData.User.firstName}}, {{customData.Car.nickName}}
        </div>
      </v-calendar>
    </v-flex>
  </v-layout>
</template>

<script>
// import CAR_COLOUR from '../constants/carColours'
import RequestService from '@/services/RequestService'
export default {
  name: 'Calendar',
  data() {
    return {
      requests: [],
      augmentedRequests: [],
      calendarDates: [],
      calendarFormats: {
        data: ['YYYY-MM-DD']
      },
      carColours: [
        '#79D27D',
        '#2D8631',
        '#4087BF',
        '#B3CFE5',
        '#40BABF',
        '#FFC107',
        '#FFEB3B',
        '#90A4AE',
        '#BA68C8',
        '#7B1FA2'
      ]
    }
  },
  async mounted() {
    this.getRequests()
  },
  methods: {
    async getRequests() {
      try {
        const response = await RequestService.getPendingRequests(
          this.$store.state.user.id
        )
        if (response.data && response.data !== []) {
          this.requests = response.data
          this.calendarDates = this.requests.map(request => ({
            key: request.id,
            dot: {
              backgroundColor: this.carColours[request.CarId],
              opacity: request.status === 'Pending' ? 0.3 : 1
            },
            dates: {
              start: request.startTime.substr(0, 10),
              end: request.finishTime.substr(0, 10)
            },
            popover: {
              slot: 'multi-day-row'
            },
            customData: request
          }))
        } else {
        }
      } catch (error) {
        // todo: global notifier
        console.log(error)
      }
    },
    getDateDisplay(currentDate, startDateTime, finishDateTime) {
      // if startTime == endTime single date -> hh:mm - hh:mm
      // if startTime is currentDate displayed -> hh:mm - *
      // if endTime is currentDate displayed -> * - hh:mm
      // else *
      const startDate = new Date(startDateTime)
      const startTime = startDateTime.substr(11, 5)
      const finishDate = new Date(finishDateTime)
      const finishTime = finishDateTime.substr(11, 5)
      if (this.sameDay(startDate, finishDate)) {
        return `${startTime} - ${finishTime}`
      } else if (this.sameDay(currentDate, startDate)) {
        return `${startTime} - *`
      } else if (this.sameDay(currentDate, finishDate)) {
        return `* - ${finishTime}`
      } else {
        return `*`
      }
    },
    sameDay(firstDate, secondDate) {
      if (
        firstDate.getYear() === secondDate.getYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate()
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
</style>
