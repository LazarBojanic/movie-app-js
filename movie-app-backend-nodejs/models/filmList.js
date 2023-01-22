'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FilmList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.serviceUser, {foreignKey: 'serviceUserId'});
      //this.belongsToMany(models.film, {through: models.filmList});
    }
  };
  FilmList.init({
    filmListName : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    averageRating : {
      type: DataTypes.FLOAT,
      allowNull: true,
      unique: false
    }
  }
  ,{
    sequelize,
    tableName: 'filmList',
    modelName: 'filmList',
  });
  return FilmList;
};