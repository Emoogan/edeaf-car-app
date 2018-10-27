module.exports = (app) => {
    app.get('/health-check', (req, res) => {
    res.send({
        message: `Server is running on port ${process.env.PORT || 8081}`
    })
})
    app.post('/register', (req,res) => {
        res.send({
            message: `You have been registered with ${req.body.username} as your username and ${req.body.email} as your email`
        })
    })
}