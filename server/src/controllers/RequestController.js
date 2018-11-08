const { Request, User, Car } = require('../models')
module.exports = {
  async createRequest(req, res) {
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
  },

  async pendingRequests(req, res) {
    try {
      // get user information, if user is admin, get all pending requests,
      // if user is not admin, get pending for that user only
      const { userId } = req.query
      const user = await User.findByPk(userId)
      //   console.log('server here user', user)
      if (!user) {
        res.status(403).send({
          error: 'This user is not registered'
        })
      } else {
        const where = { status: 'Pending' }
        if (user.role !== 'Admin') {
          where.UserId = user.id
        }
        const requests = await Request.findAll({
          where: where,
          include: [
            { model: Car },
            {
              model: User,
              attributes: ['firstName', 'lastName']
            }
          ]
        })
        //   .map(request => request.toJSON())
        if (requests === [] || requests === null) {
          return res.status(403).send({
            error: 'There are no pending requests'
          })
        } else {
          return res.status(200).send(requests)
        }
      }
    } catch (err) {
      response.status(400).send({
        error: 'Server Error'
      })
    }
  },
  async updateStatusWithStatusReason(req, res) {
    try {
      const { requestId, status, statusReason } = req.query
      const request = await Request.findByPk(requestId)
      if (request !== null) {
        request.status = status
        const fields = ['status']
        if (statusReason !== null) {
          request.statusReason = statusReason
          fields.push('statusReason')
        }
        request.save({ fields: fields })
        return res.status(204).send()
      } else {
        return res.status(400).send({
          error: 'This request does not exist'
        })
      }
    } catch (error) {
      return res.status(500).send({
        error: 'Server Error'
      })
    }
  }
}
