'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CountryOfFilm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.country, { foreignKey: 'countryId' });
      this.belongsTo(models.film, { foreignKey: 'filmId' });
    }
  };
  CountryOfFilm.init({

  }
  ,{
    sequelize,
    tableName: 'countryOfFilm',
    modelName: 'countryOfFilm',
  });
  return CountryOfFilm;
};