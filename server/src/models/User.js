const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
// const bcrypt = require('bcrypt-nodejs')

function hashPassword(user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      username: { type: DataTypes.STRING },
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      office: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING }
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        beforeSave: hashPassword
      }
    }
  )

  User.prototype.comparePassword = function(password) {
    return bcrypt.compareAsync(password, this.password)
  }
  return User
}
