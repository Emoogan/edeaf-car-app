module.exports = (sequelize, DataTypes) =>
{
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING }
  })
  return User
}