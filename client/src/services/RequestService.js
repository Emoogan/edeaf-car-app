import Api from '@/services/Api'

export default {
  createPendingRequest(request) {
    return Api().post('request-car', request)
  }
}
