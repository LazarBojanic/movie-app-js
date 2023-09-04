'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.film, {through: models.crewMember});
    }
  };
  Artist.init({
    artistName : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    birthday : {
      type: DataTypes.DATEONLY,
      allowNull: true,
      unique: false
    },
    deathday : {
      type: DataTypes.DATEONLY,
      allowNull: true,
      unique: false
    },
    placeOfBirth : {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    biography : {
      type: DataTypes.STRING(5000),
      allowNull: true,
      unique: false
    },
    imageUrl : {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
    }
    ,{
      sequelize,
      tableName: 'artist',
      modelName: 'artist',
    });
  return Artist;
};