import Api from '@/services/Api'

export default {
  createPendingRequest(request) {
    return Api().post('request-car', request)
  },

  getPendingRequests(userId) {
    return Api().get('pending-requests', { params: { userId: userId } })
  },

  getCalendarDates() {
    return Api().get('calendar-requests')
  },

  setStatus(requestId, status, statusReason) {
    const params = {
      requestId: requestId,
      status: status,
      statusReason: statusReason
    }
    return Api().put('update-request', null, {
      params: params
    })
  }
}
