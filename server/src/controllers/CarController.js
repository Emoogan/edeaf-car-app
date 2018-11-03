const { Car } = require('../models')
// const { Request } = require('../models')
// const Op = Sequelize.Op;

module.exports = {
//   async getCarByDate(req, res)
// Do it considering dates later.. with raw sql will probably be best

// sequelize.query('SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $status',
//   { bind: { status: 'active' }, type: sequelize.QueryTypes.SELECT }
// ).then(projects => {
//   console.log(projects)
// })

async fetchCars(request, response) {
    try {
        const {begin, end} = request.query
        if(begin && end) {
            // do the date range thing
        }
        // else {
            const cars = await Car.findAll()
        // }
        
      if (cars === []) {
        return response.status(403).send({
          error: 'There are no cars available'
        })
      }
      else {
          return response.status(200).send(cars)
      }

    }
    catch (err) {

    }
}
}
