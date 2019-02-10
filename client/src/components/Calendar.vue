<template>
  <v-layout row wrap="">
    <v-flex d-flex xs12 md9 lg6 offset-lg3>
      <v-calendar
        :attributes="calendarDates"
        :formats="calendarFormats"
        :theme-styles="calendarStyles"
      >
        <!-- POPOVER SLOT -->
        <div slot="multi-day-row" slot-scope="{customData, day}">
          {{getDateDisplay(day.date, customData.startTime, customData.finishTime)}}
          {{customData.User.firstName}}, {{customData.Car.nickName}}
          <v-icon small>{{getIconDisplay(customData.status)}}</v-icon>
        </div>
      </v-calendar>
    </v-flex>
  </v-layout>
</template>

<script>
import RequestService from '@/services/RequestService'
export default {
  name: 'Calendar',
  data() {
    const hSpacing = '15px'
    return {
      requests: [],
      augmentedRequests: [],
      calendarDates: [],
      calendarFormats: {
        data: ['YYYY-MM-DD']
      },
      calendarStyles: {
        wrapper: {
          borderRadius: '5px',
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.14), 0 6px 20px 0 rgba(0, 0, 0, 0.13)'
        },
        headerHorizontalDivider: {
          borderTop: 'solid rgba(0, 0, 0, 0.2) 1px',
          width: '80%'
        },
        header: {
          backgroundColor: '#7CB342',
          color: 'white',
          padding: `10px ${hSpacing}`
        },
        headerTitle: {
          fontSize: '16pt',
          fontWeight: '700' // And bolder font weight
        },
        weekdays: {
          padding: `20px ${hSpacing} 5px ${hSpacing}`,
          fontWeight: '700', // And bolder font weight
          fontSize: '12pt'
        },
        weeks: {
          padding: `0 ${hSpacing} ${hSpacing} ${hSpacing}`
        },
        dayContent: {
          fontSize: '11pt'
        }
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
        const response = await RequestService.getCalendarDates()
        if (response.data && response.data !== []) {
          this.requests = response.data
          this.calendarDates = this.requests.map(request => ({
            key: request.id,
            dot: {
              backgroundColor: this.carColours[request.CarId],
              opacity: request.status === 'Pending' ? 0.3 : 1
            },
            dates: {
              // start: request.startTime.substr(0, 10),
              start: new Date(request.startTime),
              // end: request.finishTime.substr(0, 10)
              end: new Date(request.finishTime)
            },
            popover: {
              slot: 'multi-day-row'
            },
            customData: request
          }))
        } else {
        }
      } catch (error) {
        this.$toasted.show(`Error: ${error}`, {
          icon: 'priority_high'
        })
        console.log(error)
      }
    },
    getIconDisplay(status) {
      if (status === 'Pending') {
        return 'watch_later'
      } else {
        return 'check'
      }
    },
    getDateDisplay(currentDate, startDateTime, finishDateTime) {
      // if startTime == endTime single date -> hh:mm - hh:mm
      // if startTime is currentDate displayed -> hh:mm - *
      // if endTime is currentDate displayed -> * - hh:mm
      // else *
      const startDate = new Date(startDateTime)
      // const startTime = startDateTime.substr(11, 5)
      const startTime = startDate.toLocaleTimeString()
      const finishDate = new Date(finishDateTime)
      // const finishTime = finishDateTime.substr(11, 5)
      const finishTime = finishDate.toLocaleTimeString()
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
