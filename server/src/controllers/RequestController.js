const { Request } = require('../models')
module.exports = {
  async request(req, res) {
    try {
      // create new request will always have status pending
      req.body['status'] = 'Pending'
      const request = await Request.create(req.body)
      res.status(200).send(request)
    } catch (err) {
      res.status(400).send({
        error: 'This request could not be made'
      })
    }
  }
}
