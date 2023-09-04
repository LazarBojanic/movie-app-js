'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GenreOfFilm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.genre, { foreignKey: 'genreId' });
      this.belongsTo(models.film, { foreignKey: 'filmId' });
    }
  };
  GenreOfFilm.init({

  }
  ,{
    sequelize,
    tableName: 'genreOfFilm',
    modelName: 'genreOfFilm',
  });
  return GenreOfFilm;
};