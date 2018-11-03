const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const CarController = require('./controllers/CarController')
const RequestController = require('./controllers/RequestController')

module.exports = (app) => {
    app.get('/health-check', (req, res) => {
    res.send({
        message: `Server is running on port ${process.env.PORT || 8081}`
    })
})

    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/login', AuthenticationController.login)

    app.get('/cars', CarController.fetchCars)

    app.post('/request-car', RequestController.request)

}