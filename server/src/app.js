const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

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

app.listen(process.env.PORT || 8081)
