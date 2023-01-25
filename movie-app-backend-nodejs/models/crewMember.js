'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CrewMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.artist, {foreignKey: 'artistId'});
      this.belongsTo(models.film, {foreignKey: 'filmId'});
      
    }
  };
  CrewMember.init({
    crewMemberRole : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }
  }
  ,{
    sequelize,
    tableName: 'crewMember',
    modelName: 'crewMember',
  });
  return CrewMember;
};