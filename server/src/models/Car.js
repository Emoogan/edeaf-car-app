module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    'Car',
    {
      nickName: { type: DataTypes.STRING, unique: true },
      registrationNumber: { type: DataTypes.STRING, unique: true },
      make: { type: DataTypes.STRING },
      model: { type: DataTypes.STRING },
      year: { type: DataTypes.SMALLINT },
      seatNumber: { type: DataTypes.SMALLINT },
      office: { type: DataTypes.STRING }
    }
  )
  return Car
}
