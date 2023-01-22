'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FilmInLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {    
    }
  };
  FilmInLibrary.init({
    liked : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    watched : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    reviewed : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    review : {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
  }
  ,{
    sequelize,
    tableName: 'filmInLibrary',
    modelName: 'filmInLibrary',
  });
  return FilmInLibrary;
};