module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    startTime: { type: DataTypes.DATE },
    finishTime: { type: DataTypes.DATE },
    location: { type: DataTypes.STRING },
    reason: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING }
    //inferred associations: carId and userId
  })

  Request.associate = models => {
    // associations can be defined here
    Request.belongsTo(models.Car)
    Request.belongsTo(models.User)
  }
  return Request
}
