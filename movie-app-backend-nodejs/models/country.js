'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.film, {through: models.countryOfFilm});
    }
  };
  Country.init({
    countryName : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
      },
      countryCode : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        }
    }
    ,{
      sequelize,
      tableName: 'country',
      modelName: 'country',
    });
  return Country;
};