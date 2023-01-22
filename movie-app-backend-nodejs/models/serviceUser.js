'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /*this.hasMany(models.filmInLibrary);*/
      this.hasMany(models.filmList);
      //this.belongsToMany(models.film, {through: models.filmInLibrary});
    }
  };
  ServiceUser.init({
    username : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    email : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    pass : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    userRole : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }
  }
  ,{
    sequelize,
    tableName: 'serviceUser',
    modelName: 'serviceUser',
  });
  return ServiceUser;
};