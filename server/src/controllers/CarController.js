const { Car } = require('../models')
const { Request } = require('../models')
const { Sequelize } = require('../models')
const _ = require('lodash')

module.exports = {

  async fetchCars(request, response) {
    try {
      const { begin, end } = request.query
      var result = await Car.findAll()
      if (begin && end) {
        const requestData = await Request.findAll({
          where: {
            startTime: { [Sequelize.Op.lt]: end },
            finishTime: { [Sequelize.Op.gt]: begin },
            status: {
              [Sequelize.Op.or]: ['Pending', 'Approved']
            }
          },
          attributes: ['CarId']
        })
        const carIds = _.map(requestData, 'dataValues').map(element => {
          return { id: element.CarId }
        })
        const cars = await Car.findAll()
        result = _.differenceBy(cars, carIds, 'id')
      } 

      if (result === []) {
        return response.status(403).send({
          error: 'There are no cars available'
        })
      } else {
        return response.status(200).send(result)
      }
    } catch (err) {
      console.log('ERROR', err)
      return response.status(500).send(err)
    }
  }
}
