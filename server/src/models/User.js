module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    // password: DataTypes.STRING
    password: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING }
  })