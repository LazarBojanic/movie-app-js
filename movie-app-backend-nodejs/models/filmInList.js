'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FilmInList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  FilmInList.init({
  },
  {
    sequelize,
    tableName: 'filmInList',
    modelName: 'filmInList',
  });
  return FilmInList;
};