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

      this.belongsToMany(models.studio, {through: models.studioOfFilm});
      this.belongsToMany(models.genre, {through: models.genreOfFilm});
      this.belongsToMany(models.country, {through: models.countryOfFilm});

      this.belongsToMany(models.serviceUser, {through: models.filmInLibrary});
      this.hasMany(models.filmInList, { foreignKey: 'filmId'/* , as: 'filmsInList'*/});

    }
  };
  Film.init({
    title : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    rating : {
      type: DataTypes.FLOAT,
      allowNull: true,
      unique: false
    },
    synopsis : {
      type: DataTypes.STRING(1500),
      allowNull: true,
      unique: false
    },
    releaseDate : {
      type: DataTypes.DATEONLY,
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
    tableName: 'film',
    modelName: 'film',
  });
  return Film;
};