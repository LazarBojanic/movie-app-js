'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
      this.belongsToMany(models.film, {through: models.studioOfFilm});
    }
  };
  Studio.init({
    studioName : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
  }
  ,{
    sequelize,
    tableName: 'studio',
    modelName: 'studio',
  });
  return Studio;
};