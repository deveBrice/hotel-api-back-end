'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HotelDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.HotelDetail.hasOne(models.Hotel, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  }
  HotelDetail.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    tags: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HotelDetail',
  });
  return HotelDetail;
};