const { User } = require('../models')
const jwt = require('jsonwebtoken')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user,'secret', {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
    //   message: `You have been registered with ${req.body.username} as your username and ${req.body.email} as your email`
  },

  async login(req, res) {
    try {
      const { password, username } = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      if (await user.comparePassword(password)) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })

    } catch (err) {
      res.status(500).send({
        error: 'An error has occured' +err
      })
    }
    //   message: `You have been registered with ${req.body.username} as your username and ${req.body.email} as your email`
  }
}
