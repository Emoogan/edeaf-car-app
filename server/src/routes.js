const AuthenticationController = require('./controllers/AuthenticationController')
module.exports = (app) => {
    app.get('/health-check', (req, res) => {
    res.send({
        message: `Server is running on port ${process.env.PORT || 8081}`
    })
})

    app.post('/register', AuthenticationController.register)
}