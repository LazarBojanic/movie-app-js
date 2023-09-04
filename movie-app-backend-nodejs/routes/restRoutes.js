const express = require('express');

const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));

const { artist, crewMember, film, filmInLibrary, filmInList, filmList, serviceUser, studio, genre, country, studioOfFilm, genreOfFilm, countryOfFilm } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const joi = require('joi');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function authToken(req, res, next) {
  console.log('authenticating token')
  const nonSecurePaths = ['/user/login', '/user/register'];
  if (nonSecurePaths.includes(req.path)){
    return next();
  }
  
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ msg: 'Not authenticated' });

  //console.log(token);
  const decodedToken = jwt_decode(token);
  console.log(decodedToken.userRole);
  console.log('heyyyyyy ' + req.path);
  if(decodedToken.userRole == 'admin' || decodedToken.userRole == 'moderator' || decodedToken.userRole == 'client' || decodedToken.userRole == 'guest'){
    const moderatorForbiddenRoutes = ['/user/create', '/user/update', '/user/delete'];
    if (moderatorForbiddenRoutes.includes(req.path)){
      if(decodedToken.userRole == 'moderator'){
        return res.status(401).json({ msg: 'Not authenticated' });
      }
    }
    const clientForbiddenRoutes = ['/artist/create', '/artist/update', '/artist/delete',
                                   '/country/create', '/country/update', '/country/delete',
                                   '/crewMember/create', '/crewMember/update', '/crewMember/delete',
                                   '/film/create', '/film/update', '/film/delete', 
                                   '/genre/create', '/genre/update', '/genre/delete',
                                   '/studio/create', '/studio/update', '/studio/delete',
                                   '/studioOfFilm/create', '/studioOfFilm/update', '/studioOfFilm/delete',
                                   '/genreOfFilm/create', '/genreOfFilm/update', '/genreOfFilm/delete',
                                   '/countryOfFilm/create', '/countryOfFilm/update', '/countryOfFilm/delete'];
    if (clientForbiddenRoutes.includes(req.path)){
      if(decodedToken.userRole == 'client'){
        return res.status(401).json({ msg: 'Not authenticated' });
      }
    }
    const guestForbiddenRoutes = ['/artist/create', '/artist/update', '/artist/delete',
                                   '/country/create', '/country/update', '/country/delete',
                                   '/crewMember/create', '/crewMember/update', '/crewMember/delete',
                                   '/film/create', '/film/update', '/film/delete', 
                                   '/genre/create', '/genre/update', '/genre/delete',
                                   '/studio/create', '/studio/update', '/studio/delete',
                                   '/filmInLibrary/create', '/filmInLibrary/update', '/filmInLibrary/delete',
                                   '/filmList/create', '/filmList/update', '/filmList/delete',
                                   '/filmInList/create', '/filmInList/update', '/filmInList/delete',
                                   '/studioOfFilm/create', '/studioOfFilm/update', '/studioOfFilm/delete',
                                   '/genreOfFilm/create', '/genreOfFilm/update', '/genreOfFilm/delete',
                                   '/countryOfFilm/create', '/countryOfFilm/update', '/countryOfFilm/delete'];
    if (guestForbiddenRoutes.includes(req.path)){
      if(decodedToken.userRole == 'guest'){
        return res.status(401).json({ msg: 'Not authenticated' });
      }
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, serviceUser) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.serviceUser = serviceUser;
    
        next();
    });
  }
}




router.use(authToken);

router.get('/user/getAll', async (req, res) => {
  serviceUser.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/user/get/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  serviceUser.findOne({where: { id: req.params.id}})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
  }
});
router.get('/user/getByToken/:token', (req, res) => {
  const token = req.params.token;
  
  const decodedToken = jwt_decode(token);
  serviceUser.findOne({where: { id: decodedToken.id }})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
});


router.post('/user/create', async (req, res) => {
  const { username, email, pass, userRole } = req.body;
  /*if(serviceUser.findOne({where: {email: email}})){
    res.status(409).json({ 'message': 'Email already in use.' });
  }*/
  try{
    const schema = joi.object({
      username: joi.string().required(),
      email: joi.string().required(),
      pass: joi.string().required(),
      userRole: joi.string().required()
    });
    const {error, value} = schema.validate({
      username: req.body.username,
      email: req.body.email,
      pass: req.body.pass,
      userRole: req.body.userRole
    });
  
    if(error){
      msg = error;
      res.status(400).json({msg: msg});
    }
    else{
      const hashedPass = await bcrypt.hash(pass, 10);
      serviceUser.create({username: username, email: email, pass: hashedPass, userRole: userRole})
      .then(rows => res.json(rows))
      .catch(err => res.status(500).json(err));
    }
  }
  catch(err){
    res.status(500).json({ 'message': err.message });
  }
});

router.put('/user/update/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required(),
    username: joi.string().required(),
    email: joi.string().required(),
    pass: joi.string().required(),
    userRole: joi.string().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id,
    username: req.body.username,
    email: req.body.email,
    pass: req.body.pass,
    userRole: req.body.userRole
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{

  const pass = req.body.pass;
  const hashedPass = await bcrypt.hash(pass, 10);

  serviceUser.update({ username: req.body.username, email: req.body.email, pass: hashedPass, userRole: req.body.userRole },{ where: { id: req.params.id } } )
    .then(count => {
      console.log('Rows updated ' + count);
  })
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});
router.delete('/user/delete/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  serviceUser.destroy({where: { id: req.params.id }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});




router.get('/artist/getAll/:pageSize/:pageNumber', async (req, res) => {
  const { pageSize, pageNumber } = req.params;
  console.log(pageSize + " : " + pageNumber);
  const limit = parseInt(pageSize, 10); // Convert to integer
  const offset = (parseInt(pageNumber, 10) - 1) * limit; // Calculate offset

  try {
    const artists = await artist.findAll({
      order: [['artistName', 'ASC']],
      limit,
      offset,
    });

    const count = await artist.count();

    const data = { artists, count }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/artist/get/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  artist.findOne({where: { id: req.params.id}})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
  }
});
router.get('/artist/search/:searchTerm', async (req, res) => {
  const schema = joi.object({
    searchTerm: joi.string()
  });
  const {error, value} = schema.validate({
    searchTerm: req.params.searchTerm
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    const searchTerm = req.params.searchTerm;
    artist.findAll({where: {
      artistName: {
          [Op.iLike]: `%${searchTerm}%`
      }
  }, order: [["artistName", "ASC"]]})
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));

  }
});

router.post('/artist/create', async (req, res) => {

  const schema = joi.object({
    id: joi.number().required(),
    artistName: joi.string().required(),
    birthday: joi.date().optional(),
    deathday: joi.date().optional(),
    placeOfBirth: joi.string().optional(),
    biography: joi.string().optional(),
    imageUrl: joi.string().optional()
  });
  const {error, value} = schema.validate({
    id: req.body.id,
    artistName: req.body.artistName,
    birthday: req.body.birthday,
    deathday: req.body.deathday,
    placeOfBirth: req.body.placeOfBirth,
    biography: req.body.biography,
    imageUrl: req.body.imageUrl
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    artist.create({
      id: req.body.id,
      artistName: req.body.artistName,
      birthday: req.body.birthday,
      deathday: req.body.deathday,
      placeOfBirth: req.body.placeOfBirth,
      biography: req.body.biography,
      imageUrl: req.body.imageUrl
    })
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }

  
});

router.put('/artist/update/:id', async (req, res) => {
  
  const schema = joi.object({
    id: joi.number().required(),
    artistName: joi.string().required(),
    birthday: joi.date().optional(),
    deathday: joi.date().optional(),
    placeOfBirth: joi.string().optional(),
    biography: joi.string().optional(),
    imageUrl: joi.string().optional()
  });
  const {error, value} = schema.validate({
      id: req.params.id,
      artistName: req.body.artistName,
      birthday: req.body.birthday,
      deathday: req.body.deathday,
      placeOfBirth: req.body.placeOfBirth,
      biography: req.body.biography,
      imageUrl: req.body.imageUrl
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  artist.update({ id: req.params.id,
    artistName: req.body.artistName,
    birthday: req.body.birthday,
    deathday: req.body.deathday,
    placeOfBirth: req.body.placeOfBirth,
    biography: req.body.biography,
    imageUrl: req.body.imageUrl},{ where: { id: req.params.id } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});
router.delete('/artist/delete/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  artist.destroy({where: { id: req.params.id }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});




router.get('/crewMember/getAll', async (req, res) => {
  crewMember.findAll({
    attributes:['id', 'filmId', 'artistId','crewMemberRole', 'characterName'],
    include: [
      {
        model: artist,
        attributes: ['artistName']
      },
      {
        model: film,
        attributes: ['title','releaseDate']
      }
    ]
  })
  .then(rows => res.json(rows))
    .catch( err => {
      console.log(err);
      res.status(500).json(err)}
      );
});
router.get('/crewMember/get/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    crewMember.findOne({
      attributes:['id', 'filmId', 'artistId','crewMemberRole', 'characterName'],
      where: {id: req.params.id},
      include: [
        {
          model: artist,
          attributes: ['artistName']
        },
        {
          model: film,
          attributes: ['title','releaseDate']
        }
      ]
    })
    .then(rows => res.json(rows))
    .catch( err => {
      console.log(err);
      res.status(500).json(err)}
      );
  }
});
router.get('/crewMember/getAllByArtistId/:artistId', async (req, res) => {
  const schema = joi.object({
    artistId: joi.number().required()
  });
  const {error, value} = schema.validate({
    artistId: req.params.artistId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    crewMember.findAll({
      attributes:['id', 'filmId', 'artistId','crewMemberRole', 'characterName'],
      where: {artistId: req.params.artistId},
      include: [
        {
          model: artist,
          attributes: ['artistName']
        },
        {
          model: film,
          attributes: ['title','releaseDate']
        }
      ]
    })
    .then(rows => res.json(rows))
    .catch( err => {
      console.log(err);
      res.status(500).json(err)}
      );
  }
});

router.get('/crewMember/getAllByFilmId/:filmId', async (req, res) => {
  const schema = joi.object({
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    crewMember.findAll({
      attributes:['id', 'filmId', 'artistId','crewMemberRole', 'characterName'],
      where: {filmId: req.params.filmId},
      include: [
        {
          model: artist,
          attributes: ['artistName']
        },
        {
          model: film,
          attributes: ['title','releaseDate']
        }
      ]
    })
    .then(rows => res.json(rows))
    .catch( err => {
      console.log(err);
      res.status(500).json(err)}
      );
  }
});


router.post('/crewMember/create', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required(),
    artistId: joi.number().required(),
    filmId: joi.number().required(),
    crewMemberRole: joi.string().required(),
    characterName: joi.string().optional()
  });
  const {error, value} = schema.validate({
    id: req.body.id,
    artistId: req.body.artistId,
    filmId: req.body.filmId,
    crewMemberRole: req.body.crewMemberRole,
    characterName: req.body.characterName
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  crewMember.create({id: req.body.id,
    artistId: req.body.artistId,
    filmId: req.body.filmId,
    crewMemberRole: req.body.crewMemberRole,
    characterName: req.body.characterName})
    .then( rows => res.json(rows))
    .catch( err => res.status(500).json(err));
  }
});

router.put('/crewMember/update/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required(),
    artistId: joi.number().required(),
    filmId: joi.number().required(),
    crewMemberRole: joi.string().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id,
    artistId: req.body.artistId,
    filmId: req.body.filmId,
    crewMemberRole: req.body.crewMemberRole,
    characterName: req.body.characterName
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  crewMember.update({ id: req.params.id,
    artistId: req.body.artistId,
    filmId: req.body.filmId,
    crewMemberRole: req.body.crewMemberRole,
    characterName: req.body.characterName },{ where: { id: req.params.id } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});
router.delete('/crewMember/delete/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  crewMember.destroy({where: { id: req.params.id }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});














router.get('/film/getAll/:pageSize/:pageNumber', async (req, res) => {
  const { pageSize, pageNumber } = req.params;
  console.log(pageSize + " : " + pageNumber);
  const limit = parseInt(pageSize, 10); // Convert to integer
  const offset = (parseInt(pageNumber, 10) - 1) * limit; // Calculate offset

  try {
    const films = await film.findAll({
      order: [['title', 'ASC']],
      limit,
      offset,
    });

    const count = await film.count();

    const data = { films, count }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/film/get/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  film.findOne({where: { id: req.params.id}})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
  }
});






router.get('/film/search/:searchTerm', async (req, res) => {
  const schema = joi.object({
    searchTerm: joi.string()
  });
  const {error, value} = schema.validate({
    searchTerm: req.params.searchTerm
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    const searchTerm = req.params.searchTerm;
    film.findAll({where: {
      title: {
          [Op.iLike]: `%${searchTerm}%`
      }
  }, order: [["title", "ASC"]]})
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));

  }
});

router.post('/film/create', async (req, res) => {
  console.log('creating film');
  const schema = joi.object({
    id: joi.number().required(),
    title: joi.string().required(),
    rating: joi.number().optional(),
    synopsis: joi.string().optional(),
    releaseDate: joi.date().optional(),
    imageUrl: joi.string().optional(),
    genreId: joi.string().optional(),
    studioId: joi.string().optional(),
    countryId: joi.string().optional()
  });
  const {error, value} = schema.validate({
    id: req.body.id,
    title: req.body.title,
    rating: req.body.rating,
    synopsis: req.body.synopsis,
    releaseDate: req.body.releaseDate,
    imageUrl: req.body.imageUrl,
    genreId: req.body.genreId,
    studioId: req.body.studioId,
    countryId: req.body.countryId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    film.create({id: req.body.id, title: req.body.title, rating: req.body.rating, synopsis: req.body.synopsis, releaseDate: req.body.releaseDate, imageUrl: req.body.imageUrl})
      .then(rows => res.json(rows))
      .catch(err => res.status(500).json(err));
      
      genreOfFilm.create({genreId: req.body.genreId, filmId: req.body.id})
      .then(rows => res.json(rows))
      .catch(err => res.status(500).json(err));

      countryOfFilm.create({countryId: req.body.countryId, filmId: req.body.id})
      .then(rows => res.json(rows))
      .catch(err => res.status(500).json(err));

      studioOfFilm.create({studioId: req.body.studioId, filmId: req.body.id})
      .then(rows => res.json(rows))
      .catch(err => res.status(500).json(err));
  }
});
router.put('/film/update/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required(),
    title: joi.string().required(),
    rating: joi.number().optional(),
    synopsis: joi.string().optional(),
    releaseDate: joi.date().optional(),
    imageUrl: joi.string().optional(),
    genreId: joi.number().optional(),
    studioId: joi.number().optional(),
    countryId: joi.number().optional()
  });

  const { error, value } = schema.validate({
    id: req.params.id,
    title: req.body.title,
    rating: req.body.rating,
    synopsis: req.body.synopsis,
    releaseDate: req.body.releaseDate,
    imageUrl: req.body.imageUrl,
    genreId: req.body.genreId,
    studioId: req.body.studioId,
    countryId: req.body.countryId
  });

  if (error) {
    msg = error;
    res.status(400).json({ msg: msg });
  } else {
    try {
      // Create an object to hold the fields to update in the film table
      const filmFieldsToUpdate = {};
      if (req.body.title) {
        filmFieldsToUpdate.title = req.body.title;
      }
      if (req.body.rating !== null) {
        filmFieldsToUpdate.rating = req.body.rating;
      }
      if (req.body.synopsis !== null) {
        filmFieldsToUpdate.synopsis = req.body.synopsis;
      }
      if (req.body.releaseDate !== null) {
        filmFieldsToUpdate.releaseDate = req.body.releaseDate;
      }
      if (req.body.imageUrl !== null) {
        filmFieldsToUpdate.imageUrl = req.body.imageUrl;
      }

      // Update the film table with the conditional fields
      const [count] = await film.update(filmFieldsToUpdate, { where: { id: req.params.id } });

      // Update related tables based on genreId, studioId, and countryId
      if (req.body.genreId) {
        await genreOfFilm.update({ genreId: req.body.genreId }, { where: { filmId: req.params.id } });
      }
      if (req.body.studioId) {
        await studioOfFilm.update({ studioId: req.body.studioId }, { where: { filmId: req.params.id } });
      }
      if (req.body.countryId) {
        await countryOfFilm.update({ countryId: req.body.countryId }, { where: { filmId: req.params.id } });
      }

      console.log('Rows updated ' + count);
      res.json({ msg: 'Film updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Internal server error' });
    }
  }
});

router.delete('/film/delete/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  film.destroy({where: { id: req.params.id }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});










router.get('/filmInLibrary/getAll', async (req, res) => {
  filmInLibrary.findAll({attributes:['id', 'serviceUserId', 'filmId', 'watched', 'liked', 'reviewed', 'review']

  })
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/filmInLibrary/get/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  filmInLibrary.findOne({where: { id: req.params.id}})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
  }
});

router.get('/filmInLibrary/getByUserIdAndFilmId/:userId/:filmId', async (req, res) => {
  console.log('getting film in library');
  const schema = joi.object({
    userId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    userId: req.params.userId,
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    filmInLibrary.findOne({
      attributes:['id', 'liked', 'watched', 'reviewed', 'review'],
      include: [
        {
          model: serviceUser,
          attributes: [['id', 'userId']],
          where: {id: req.params.userId}
        },
        {
          model: film,
          attributes: [['id', 'filmId'], 'title', 'rating', 'releaseDate', 'imageUrl'],
          where: {id: req.params.filmId}
        }
      ]
    })
    .then(row => {
        res.json(row);
    });
  }
});

router.get('/filmInLibrary/getAllByUserId/:userId', async (req, res) => {
  console.log('getting films in library');
  const schema = joi.object({
    userId: joi.number().required()
  });
  const {error, value} = schema.validate({
    userId: req.params.userId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    filmInLibrary.findAll({
      attributes:['id', 'liked', 'watched', 'reviewed', 'review'],
      include: [
        {
          model: serviceUser,
          attributes: [['id', 'userId']],
          where: {id: req.params.userId}
        },
        {
          model: film,
          attributes: [['id', 'filmId'], 'title', 'rating', 'releaseDate', 'imageUrl']
        }
      ]
    })
    .then(rows => {
        res.json(rows);
    });
  }
});

router.post('/filmInLibrary/create', async (req, res) => {
  console.log('creating film in library')
  const schema = joi.object({
    id: joi.number().required(),
    filmId: joi.number().required(),
    serviceUserId: joi.number().required(),
    liked: joi.string().required(),
    watched: joi.string().required(),
    reviewed: joi.string().required(),
    review: joi.string().allow(null, '')
  });
  const {error, value} = schema.validate({
    id: req.params.id,
    filmId: req.body.filmId,
    serviceUserId: req.body.serviceUserId,
    liked: req.body.liked,
    watched: req.body.watched,
    reviewed: req.body.reviewed,
    review: req.body.review
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    filmInLibrary.create({filmId: req.body.filmId, serviceUserId: req.body.serviceUserId, liked: req.body.liked, watched: req.body.watched, reviewed: req.body.reviewed, review: req.body.review})
    .then( rows => res.json(rows))
    .catch( err => res.status(500).json(err));
  }
});

router.post('/filmInLibrary/add', async (req, res) => {
  console.log('creating film in library')
  const schema = joi.object({
    serviceUserId: joi.number().required(),
    filmId: joi.number().required()
    
  });
  const {error, value} = schema.validate({
    serviceUserId: req.body.serviceUserId,
    filmId: req.body.filmId
    
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    filmInLibrary.create({filmId: req.body.filmId, serviceUserId: req.body.serviceUserId, liked: 'No', watched: 'No', reviewed: 'No', review: ''})
    .then( rows => res.json(rows))
    .catch( err => res.status(500).json(err));
  }
});

router.put('/filmInLibrary/update/:id', async (req, res) => {
  console.log('updating');
  const schema = joi.object({
    id: joi.number().required(),
    filmId: joi.number().required(),
    serviceUserId: joi.number().required(),
    liked: joi.string().allow(null),
    watched: joi.string().allow(null),
    reviewed: joi.string().allow(null),
    review: joi.string().allow(null, '')
  });
  const {error, value} = schema.validate({
    id: req.params.id,
    filmId: req.body.filmId,
    serviceUserId: req.body.serviceUserId,
    liked: req.body.liked,
    watched: req.body.watched,
    reviewed: req.body.reviewed,
    review: req.body.review
  });

  if(error){
    console.log(value);
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    const fieldsToUpdate = {};
    Object.entries(req.body).forEach(([key, value]) => {
      if (value !== null) {
        fieldsToUpdate[key] = value;
      }
    });
    console.log(req.body);
    filmInLibrary.update(fieldsToUpdate, { where: { id: req.params.id }, returning: true })
    .then(count => {
        console.log('Rows updated ' + count);
    })
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
}
});
router.delete('/filmInLibrary/delete/:id', async (req, res) => {
  console.log('deleting');
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    console.log('validation error')
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  filmInLibrary.destroy({where: { id: req.params.id }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});












router.get('/filmInList/getAll', async (req, res) => {
  filmInList.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/filmInList/get/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  filmInList.findOne({where: { id: req.params.id}})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
  }
});
router.get('/filmInList/getByFilmListIdAndFilmId/:filmListId/:filmId', async (req, res) => {
  const schema = joi.object({
    filmListId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    filmListId: req.params.filmListId,
    filmId: req.params.filmId,
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    filmInList.findOne({
      attributes:['id'],
      include: [
        {
          model: filmList,
          attributes: [['id', 'filmListId'], 'filmListName', 'averageRating'],
          where: {id: req.params.filmListId}
        },
        {
          model: film,
          attributes: [['id', 'filmId'], 'title', 'rating', 'releaseDate', 'imageUrl'],
          where: {id: req.params.filmId}
        }
      ]
    })
    .then(rows => {
        res.json(rows);
    });
  }
});
router.get('/filmInList/getAllByFilmListId/:filmListId', async (req, res) => {
  const schema = joi.object({
    filmListId: joi.number().required()
  });
  const {error, value} = schema.validate({
    filmListId: req.params.filmListId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    filmInList.findAll({
      attributes:['id'],
      include: [
        {
          model: filmList,
          attributes: [['id', 'filmListId'], 'filmListName', 'averageRating'],
          where: {id: req.params.filmListId}
        },
        {
          model: film,
          attributes: [['id', 'filmId'], 'title', 'rating', 'releaseDate', 'imageUrl']
        }
      ]
    })
    .then(rows => {
        res.json(rows);
    });
  }
});

router.post('/filmInList/create', async (req, res) => {
  const schema = joi.object({
    filmId: joi.number().required(),
    filmListId: joi.number().required()
  });
  const {error, value} = schema.validate({
    filmId: req.body.filmId,
    filmListId: req.body.filmListId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    filmInList.create({filmId: req.body.filmId, filmListId: req.body.filmListId})
    .then( rows => res.json(rows))
    .catch( err => res.status(500).json(err));
  }
});

router.put('/filmInList/update/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required(),
    filmId: joi.number().required(),
    filmListId: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id,
    filmId: req.body.filmId,
    filmListId: req.body.filmListId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    const fieldsToUpdate = {};
    Object.entries(req.body).forEach(([key, value]) => {
      if (value !== null) {
        fieldsToUpdate[key] = value;
      }
    });

    filmInList.update(fieldsToUpdate, { where: { id: req.params.id } })
    .then(count => {
        console.log('Rows updated ' + count);
    })
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
}
});
router.delete('/filmInList/delete/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  filmInList.destroy({where: { id: req.params.id }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});











router.get('/filmList/getAll', async (req, res) => {
  filmList.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/filmList/get/:id', (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  filmList.findOne({where: { id: req.params.id}})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
  }
});
router.get('/filmList/getAllByUserId/:userId', async (req, res) => {
  const schema = joi.object({
    userId: joi.number().required()
  });
  const {error, value} = schema.validate({
    userId: req.params.userId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  filmList.findAll({where: { serviceUserId: req.params.userId }})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
  }
});

router.post('/filmList/create', async (req, res) => {
  const schema = joi.object({
    serviceUserId: joi.number().required(),
    filmListName: joi.string().required(),
    averageRating: joi.number().allow(null)
  });
  const {error, value} = schema.validate({
    serviceUserId: req.body.serviceUserId,
    filmListName: req.body.filmListName,
    averageRating: req.body.averageRating
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    filmList.create({serviceUserId: req.body.serviceUserId, filmListName: req.body.filmListName, averageRating: req.body.averageRating})
    .then( rows => res.json(rows))
    .catch( err => res.status(500).json(err));
  }
});

router.put('/filmList/update/:id', async (req, res) => {
  console.log('updating film list');
  const schema = joi.object({
    id: joi.number().required(),
    serviceUserId: joi.number().allow(null),
    filmListName: joi.string().allow(null),
    averageRating: joi.number().allow(null)
  });
  const {error, value} = schema.validate({
    id: req.params.id,
    serviceUserId: req.body.serviceUserId,
    filmListName: req.body.filmListName,
    averageRating: req.body.averageRating
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    const fieldsToUpdate = {};
    Object.entries(req.body).forEach(([key, value]) => {
      if (value !== null) {
        fieldsToUpdate[key] = value;
      }
    });

    filmList.update(fieldsToUpdate, { where: { id: req.params.id } })
    .then(count => {
        console.log('Rows updated ' + count);
    })
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
}
});
router.delete('/filmList/delete/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  filmList.destroy({where: { id: req.params.id }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});







router.get('/genre/getAll', async (req, res) => {
  genre.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/genre/get/:id', (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  genre.findOne({where: { id: req.params.id}})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
  }
});

router.post('/genre/create', async (req, res) => {
  const schema = joi.object({
    genreName: joi.string().required()
  });
  const {error, value} = schema.validate({
    genreName: req.body.genreName
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    genre.create({genreName: req.body.genreName})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.put('/genre/update/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required(),
    genreName: joi.string().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id,
    genreName: req.body.genreName
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    genre.update({ genreName: req.body.genreName, },{ where: { id: req.params.id }  } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});
router.delete('/genre/delete/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  genre.destroy({where: { id: req.params.id }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});













router.get('/studio/getAll', async (req, res) => {
  studio.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/studio/get/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  studio.findOne({where: { id: req.params.id}})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
  }
});

router.post('/studio/create', async (req, res) => {
  const schema = joi.object({
    studioName: joi.string().required()
  });
  const {error, value} = schema.validate({
    studioName: req.body.studioName
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  studio.create({studioName: req.body.studioName})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.put('/studio/update/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required(),
    studioName: joi.string().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id,
    studioName: req.body.studioName
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  studio.update({ studioName: req.body.studioName, },{ where: { id: req.params.id }  } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});
router.delete('/studio/delete/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  studio.destroy({where: { id: req.params.id }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  } 
});

router.get('/country/getAll', async (req, res) => {
  country.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/country/get/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  country.findOne({where: { id: req.params.id}})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
  }
});

router.post('/country/create', async (req, res) => {

  const schema = joi.object({
    countryName: joi.string().required(),
    countryCode: joi.string().required()
  });
  const {error, value} = schema.validate({
    countryName: req.body.countryName,
    countryCode: req.body.countryCode
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    country.create({countryName: req.body.countryName,
      countryCode: req.body.countryCode})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.put('/country/update/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required(),
    countryName: joi.string().required(),
    countryCode: joi.string().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id,
    countryName: req.body.countryName,
    countryCode: req.body.countryCode
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    country.update({ id: req.params.id,
      countryName: req.body.countryName,
      countryCode: req.body.countryCode},{ where: { id: req.params.id } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});

router.delete('/country/delete/:id', async (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  country.destroy({where: { id: req.params.id }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});






router.get('/genreOfFilm/getAll', async (req, res) => {
  genreOfFilm.findAll({
    attributes: ['filmId', 'genreId'],
    include: [
      {
        model: genre,
        attributes: ['genreName']
      }
    ]
  })
  .then(rows => res.json(rows))
  .catch((err) => res.status(500).json(err));
});

router.get('/genreOfFilm/getAllByGenreId/:genreId', async (req, res) => {
  const schema = joi.object({
    genreId: joi.number().required()
  });
  const { error, value } = schema.validate({
    genreId: req.params.genreId
  });

  if (error) {
    msg = error;
    res.status(400).json({ msg: msg });
  } else {
    genreOfFilm.findAll({
      where: { genreId: req.params.genreId },
      attributes: ['filmId', 'genreId'],
      include: [
        {
          model: genre,
          attributes: ['genreName']
        }
      ]
    })
    .then(rows => res.json(rows))
    .catch((err) => res.status(500).json(err));
  }
});

router.get('/genreOfFilm/getAllByFilmId/:filmId', async (req, res) => {
  const schema = joi.object({
    filmId: joi.number().required()
  });
  const { error, value } = schema.validate({
    filmId: req.params.filmId
  });

  if (error) {
    msg = error;
    res.status(400).json({ msg: msg });
  } else {
    genreOfFilm.findAll({
      where: { filmId: req.params.filmId },
      attributes: ['filmId', 'genreId'],
      include: [
        {
          model: genre,
          attributes: ['genreName']
        }
      ]
    })
    .then(rows => res.json(rows))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  }
});

router.get('/genreOfFilm/getByFilmIdAndGenreId/:filmId/:genreId', async (req, res) => {
  const schema = joi.object({
    filmId: joi.number().required(),
    genreId: joi.number().required()
  });
  const { error, value } = schema.validate({
    filmId: req.params.filmId,
    genreId: req.params.genreId
  });

  if (error) {
    msg = error;
    res.status(400).json({ msg: msg });
  } else {
    genreOfFilm.findAll({
      where: { filmId: req.params.filmId, genreId: req.params.genreId },
      attributes: ['filmId', 'genreId'],
      include: [
        {
          model: genre,
          attributes: ['genreName']
        }
      ]
    })
    .then(rows => res.json(rows))
    .catch((err) => res.status(500).json(err));
  }
});


router.post('/genreOfFilm/create', async (req, res) => {

  const schema = joi.object({
    genreId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    genreId: req.params.genreId,
    filmId: req.body.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    genreOfFilm.create({genreId: req.params.genreId,
      filmId: req.body.filmId})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.put('/genreOfFilm/updateByFilmId/:filmId', async (req, res) => {
  const schema = joi.object({
    genreId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    genreId: req.body.genreId,
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    genreOfFilm.update({ 
      genreId: req.body.genreId,
    filmId: req.params.filmId},{ where: { filmId: req.params.filmId } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});


router.put('/genreOfFilm/updateByGenreId/:genreId', async (req, res) => {
  const schema = joi.object({
    genreId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    genreId: req.params.genreId,
    filmId: req.body.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    genreOfFilm.update({ 
      genreId: req.params.genreId,
    filmId: req.body.filmId},{ where: { genreId: req.params.genreId } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});

router.delete('/genreOfFilm/deleteAllByGenreId/:genreId', async (req, res) => {
  const schema = joi.object({
    genreId: joi.number().required()
  });
  const {error, value} = schema.validate({
    genreId: req.params.genreId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    genreOfFilm.destroy({where: { genreId: req.params.genreId }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.delete('/genreOfFilm/deleteAllByFilmId/:filmId', async (req, res) => {
  const schema = joi.object({
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    genreOfFilm.destroy({where: { filmId: req.params.filmId }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.delete('/genreOfFilm/deleteByGenreIdAndFilmId/:genreId/:filmId', async (req, res) => {
  const schema = joi.object({
    genreId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    genreId: req.params.genreId,
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    genreOfFilm.destroy({where: { genreId: req.params.genreId,
      filmId: req.params.filmId }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});









router.get('/studioOfFilm/getAll', async (req, res) => {
  studioOfFilm
      .findAll({
        attributes: ['filmId', 'studioId'],
        include: [
          {
            model: studio,
            attributes: ['studioName']
          }
        ]
      })
      .then(rows => res.json(rows))
      .catch((err) => res.status(500).json(err));
});


router.get('/studioOfFilm/getAllByStudioId/:studioId', async (req, res) => {
  const schema = joi.object({
    studioId: joi.number().required()
  });
  const { error, value } = schema.validate({
    studioId: req.params.studioId
  });

  if (error) {
    msg = error;
    res.status(400).json({ msg: msg });
  } else {
    studioOfFilm
      .findAll({
        attributes: ['filmId', 'studioId'],
        where: { studioId: req.params.studioId},
        include: [
          {
            model: studio,
            attributes: ['studioName']
          }
        ]
      })
      .then(rows => res.json(rows))
      .catch((err) => res.status(500).json(err));
  }
});

router.get('/studioOfFilm/getAllByFilmId/:filmId', async (req, res) => {
  const schema = joi.object({
    filmId: joi.number().required()
  });
  const { error, value } = schema.validate({
    filmId: req.params.filmId
  });

  if (error) {
    msg = error;
    res.status(400).json({ msg: msg });
  } else {
    studioOfFilm
      .findAll({
        attributes: ['filmId', 'studioId'],
        where: { filmId: req.params.filmId },
        include: [
          {
            model: studio,
            attributes: ['studioName']
          }
        ]
      })
      .then(rows => res.json(rows))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  }
});
router.get('/studioOfFilm/getAllByFilmIdAndStudioId/:filmId/:studioId', async (req, res) => {
  const schema = joi.object({
    filmId: joi.number().required(),
    studioId: joi.number().required()
  });
  const { error, value } = schema.validate({
    filmId: req.params.filmId,
    studioId: req.params.studioId
  });

  if (error) {
    msg = error;
    res.status(400).json({ msg: msg });
  } else {
    studioOfFilm
      .findOne({
        attributes: ['filmId', 'studioId'],
        where: { studioId: req.params.studioId, filmId: req.params.filmId },
        include: [
          {
            model: studio,
            attributes: ['studioName']
          }
        ]
      })
      .then(rows => res.json(rows))
      .catch((err) => res.status(500).json(err));
  }
});


router.post('/studioOfFilm/create', async (req, res) => {

  const schema = joi.object({
    studioId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    studioId: req.params.countryId,
    filmId: req.body.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    studioOfFilm.create({studioId: req.params.studioId,
      filmId: req.body.filmId})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.put('/studioOfFilm/updateByFilmId/:filmId', async (req, res) => {
  const schema = joi.object({
    studioId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    studioId: req.body.studioId,
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    studioOfFilm.update({ 
      studioId: req.body.studioId,
    filmId: req.params.filmId},{ where: { filmId: req.params.filmId } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});

router.put('/studioOfFilm/update/:studioId', async (req, res) => {
  const schema = joi.object({
    studioId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    studioId: req.params.studioId,
    filmId: req.body.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    studioOfFilm.update({ 
      studioId: req.params.studioId,
    filmId: req.body.filmId},{ where: { studioId: req.params.studioId } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});

router.delete('/studioOfFilm/deleteAllByStudioId/:studioId', async (req, res) => {
  const schema = joi.object({
    studioId: joi.number().required()
  });
  const {error, value} = schema.validate({
    studioId: req.params.studioId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    studioOfFilm.destroy({where: { studioId: req.params.studioId }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.delete('/studioOfFilm/deleteAllByFilmId/:filmId', async (req, res) => {
  const schema = joi.object({
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    studioOfFilm.destroy({where: { filmId: req.params.filmId }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.delete('/studioOfFilm/deleteByStudioIdAndFilmId/:studioId/:filmId', async (req, res) => {
  const schema = joi.object({
    studioId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    studioId: req.params.studioId,
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    studioOfFilm.destroy({where: { studioId: req.params.studioId,
      filmId: req.params.filmId }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});



router.get('/countryOfFilm/getAll', async (req, res) => {
  countryOfFilm
      .findAll({
        attributes: ['filmId', 'countryId'],
        include: [
          {
            model: country,
            attributes: ['countryName']
          }
        ]
      })
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/countryOfFilm/getAllByCountryId/:countryId', async (req, res) => {
  const schema = joi.object({
    countryId: joi.number().required()
  });
  const {error, value} = schema.validate({
    countryId: req.params.countryId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    countryOfFilm
      .findAll({
        attributes: ['filmId', 'countryId'],
        where: { countryId: req.params.countryId},
        include: [
          {
            model: country,
            attributes: ['countryName']
          }
        ]
      })
      .then(rows => res.json(rows))
      .catch((err) => res.status(500).json(err));
  }
});
router.get('/countryOfFilm/getAllByFilmId/:filmId', async (req, res) => {
  const schema = joi.object({
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    countryOfFilm
      .findAll({
        attributes: ['filmId', 'countryId'],
        where: { filmId: req.params.filmId},
        include: [
          {
            model: country,
            attributes: ['countryName']
          }
        ]
      })
      .then(rows => res.json(rows))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  }
});
router.get('/countryOfFilm/getByFilmIdAndCountryId/:filmId/:countryId', async (req, res) => {
  const schema = joi.object({
    filmId: joi.number().required(),
    countryId: joi.number().required()
  });
  const {error, value} = schema.validate({
    filmId: req.params.filmId,
    countryId: req.params.countryId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    countryOfFilm
      .findOne({
        attributes: ['filmId', 'countryId'],
        where: { filmId: req.params.filmId, countryId: req.params.countryId },
        include: [
          {
            model: country,
            attributes: ['countryName']
          }
        ]
      })
      .then(rows => res.json(rows))
      .catch((err) => res.status(500).json(err));
  }
});

router.post('/countryOfFilm/create', async (req, res) => {

  const schema = joi.object({
    countryId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    countryId: req.params.countryId,
    filmId: req.body.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    countryOfFilm.create({countryId: req.params.countryId,
      filmId: req.body.filmId})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.put('/countryOfFilm/updateByFilmId/:filmId', async (req, res) => {
  const schema = joi.object({
    countryId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    countryId: req.body.countryId,
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    countryOfFilm.update({ 
      countryId: req.body.countryId,
    filmId: req.params.filmId},{ where: { filmId: req.params.filmId } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});

router.put('/countryOfFilm/updateByCountryId/:countryId', async (req, res) => {
  const schema = joi.object({
    countryId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    countryId: req.params.countryId,
    filmId: req.body.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    countryOfFilm.update({ 
      countryId: req.params.countryId,
    filmId: req.body.filmId},{ where: { countryId: req.params.countryId } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});

router.delete('/countryOfFilm/deleteAllByCountryId/:countryId', async (req, res) => {
  const schema = joi.object({
    countryId: joi.number().required()
  });
  const {error, value} = schema.validate({
    countryId: req.params.countryId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    countryOfFilm.destroy({where: { countryId: req.params.countryId }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.delete('/countryOfFilm/deleteAllByFilmId/:filmId', async (req, res) => {
  const schema = joi.object({
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    countryOfFilm.destroy({where: { filmId: req.params.filmId }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.delete('/countryOfFilm/deleteByCountryIdAndFilmId/:countryId/:filmId', async (req, res) => {
  const schema = joi.object({
    countryId: joi.number().required(),
    filmId: joi.number().required()
  });
  const {error, value} = schema.validate({
    countryId: req.params.countryId,
    filmId: req.params.filmId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    countryOfFilm.destroy({where: { countryId: req.params.countryId,
      filmId: req.params.filmId }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});




module.exports = router;