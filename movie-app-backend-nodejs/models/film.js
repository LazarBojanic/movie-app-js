'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.artist, {through: models.crewMember});
      this.belongsToMany(models.serviceUser, {through: models.filmInLibrary});
      this.belongsToMany(models.filmList, {through: models.filmInList});
      this.belongsTo(models.studio);
      this.belongsTo(models.genre);
      this.belongsTo(models.country);
    }
  };
  Film.init({
    title : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    pegi : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    rating : {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: false
    },
    synopsis : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }
  }
  ,{
    sequelize,
    tableName: 'film',
    modelName: 'film',
  });
  return Film;
};