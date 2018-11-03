import Api from '@/services/Api'

export default {
  getCarsByDateRange(beginDateTime, endDateTime) {
    return Api().get('cars', {params: {begin: beginDateTime, end: endDateTime}})
  }
}
