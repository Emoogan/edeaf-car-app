const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const sequelize_fixtures = require('sequelize-fixtures')
const models = require('./models')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

require("./controllers/TransportController").createTransporter()

const newDb = false
sequelize.sync({ force: newDb }).then(() => {
  if (newDb) {
    sequelize_fixtures.loadFile('src/fixtures/*.json', models).then(() => {
      app.listen(process.env.PORT || 8081)
      console.log(`Server running on ${process.env.PORT || 8081}`)
    })
  } else {
    app.listen(process.env.PORT || 8081)
    console.log(`Server running on ${process.env.PORT || 8081}`)
  }
})
