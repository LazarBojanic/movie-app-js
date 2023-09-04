'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudioOfFilm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.studio, { foreignKey: 'studioId' });
      this.belongsTo(models.film, { foreignKey: 'filmId' });
    }
  };
  StudioOfFilm.init({

  }
  ,{
    sequelize,
    tableName: 'studioOfFilm',
    modelName: 'studioOfFilm',
  });
  return StudioOfFilm;
};