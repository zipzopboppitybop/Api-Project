'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsToMany(
        models.User,
        { through: models.Bookings }
      )
      Spot.belongsToMany(
        models.User,
        { through: models.Review }
      )
      Spot.hasMany(
        models.SpotImage,
        {
          foreignKey: "spotId",
          onDelete: 'CASCADE',
          hooks: true
        }
      )
      Spot.belongsTo(
        models.User,
        { foreignKey: 'ownerId' }
      );
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL(9, 7),
    lng: DataTypes.DECIMAL(9, 7),
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(18, 2)
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
