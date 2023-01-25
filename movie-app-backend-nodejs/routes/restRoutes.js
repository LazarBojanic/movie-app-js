const express = require('express');
const path = require('path');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({extended: true}));
const { artist, crewMember, film, filmInLibrary, filmInList, filmList, serviceUser, studio, genre, country } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const joi = require('joi');


const Sequelize = require('sequelize');
const Op = Sequelize.Op;


function authToken(req, res, next) {
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
  if(decodedToken.userRole == 'admin' || decodedToken.userRole == 'moderator' || decodedToken.userRole == 'client'){
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
                                   '/studio/create', '/studio/update', '/studio/delete'];
    if (clientForbiddenRoutes.includes(req.path)){
      if(decodedToken.userRole == 'client'){
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

router.get('/user/getAll', (req, res) => {
  serviceUser.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/user/get/:id', (req, res) => {
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


router.post('/user/create', async(req, res) => {
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

router.put('/user/update/:id', async(req, res) => {
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
router.delete('/user/delete/:id', (req, res) => {
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




router.get('/artist/getAll', (req, res) => {
  artist.findAll({order: [["artistName", "ASC"]]})
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/artist/get/:id', (req, res) => {
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
router.get('/artist/search/:searchTerm', (req, res) => {
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

router.post('/artist/create', (req, res) => {

  const schema = joi.object({
    artistName: joi.string().required(),
    imageUrl: joi.string().allow(null, '')
  });
  const {error, value} = schema.validate({
    artistName: req.body.firstName,
    imageUrl: req.body.lastName
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    artist.create({artistName: req.body.artistName, imageUrl: req.body.imageUrl})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }

  
});

router.put('/artist/update/:id', (req, res) => {
  
  const schema = joi.object({
    artistName: joi.string().required(),
    imageUrl: joi.string().allow(null, '')
  });
  const {error, value} = schema.validate({
    artistName: req.body.firstName,
    imageUrl: req.body.lastName
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  artist.update({ artistName: req.body.artistName, imageUrl: req.body.imageUrl},{ where: { id: req.params.id } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});
router.delete('/artist/delete/:id', (req, res) => {
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






router.get('/country/getAll', (req, res) => {
  country.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/country/get/:id', (req, res) => {
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

router.post('/country/create', (req, res) => {

  const schema = joi.object({
    countryName: joi.string().required()
  });
  const {error, value} = schema.validate({
    countryName: req.body.countryName
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    country.create({countryName: req.body.countryName})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});

router.put('/country/update/:id', (req, res) => {
  const schema = joi.object({
    id: joi.number().required(),
    countryName: joi.string().required()
  });
  const {error, value} = schema.validate({
    id: req.params.id,
    countryName: req.body.countryName
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    country.update({ countryName: req.body.countryName},{ where: { id: req.params.id } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});
router.delete('/country/delete/:id', (req, res) => {
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











router.get('/crewMember/getAll', (req, res) => {
  crewMember.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/crewMember/get/:id', (req, res) => {
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
  crewMember.findOne({where: { id: req.params.id}})
      .then( row => res.json(row))
      .catch( err => res.status(500).json(err));
  }
});


router.post('/crewMember/create', (req, res) => {
  const schema = joi.object({
    artistId: joi.number().required(),
    filmId: joi.number().required(),
    crewMemberRole: joi.string().required()
  });
  const {error, value} = schema.validate({
    artistId: req.body.artistId,
    filmId: req.body.filmId,
    crewMemberRole: req.body.crewMemberRole
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  crewMember.create({artistId: req.body.artistId, filmId: req.body.filmId, crewMemberRole: req.body.crewMemberRole})
    .then( rows => res.json(rows))
    .catch( err => res.status(500).json(err));
  }
});

router.put('/crewMember/update/:id', (req, res) => {
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
    crewMemberRole: req.body.crewMemberRole
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  crewMember.update({ artistId: req.body.artistId, filmId: req.body.filmId, crewMemberRole: req.body.crewMemberRole },{ where: { id: req.params.id } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});
router.delete('/crewMember/delete/:id', (req, res) => {
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














router.get('/film/getAll', (req, res) => {
  film.findAll({order: [["title", "ASC"]]})
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/film/get/:id', (req, res) => {
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

router.get('/credit/getAllByArtistId/:artistId', (req, res) => {
  const schema = joi.object({
    id: joi.number().required()
  });
  const {error, value} = schema.validate({
    id: req.params.artistId
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    crewMember.findAll({
      attributes:['crewMemberRole'],
      include: [
        {
          model: artist,
          attributes: [['id', 'artistId'], 'artistName'],
          where: {id: req.params.artistId}
        },
        {
          model: film,
          attributes: [['id', 'filmId'], 'title','releaseYear']
        }
      ]
    })
    .then(rows => {
        res.json(rows);
    });
  }
});




router.get('/film/search/:searchTerm', (req, res) => {
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

router.post('/film/create', (req, res) => {
  console.log('creating film');
  const schema = joi.object({
    title: joi.string().required(),
    rating: joi.number().allow(null),
    synopsis: joi.string().allow(null, ''),
    releaseYear: joi.number(),
    imageUrl: joi.string().allow(null, ''),
    studioId: joi.number().required(),
    genreId: joi.number().required(),
    countryId: joi.number().required()
  });
  const {error, value} = schema.validate({
    title: req.body.title,
    rating: req.body.rating,
    synopsis: req.body.synopsis,
    releaseYear: req.body.releaseYear,
    imageUrl: req.body.imageUrl,
    studioId: req.body.studioId,
    genreId: req.body.genreId,
    countryId: req.body.countryId,
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
    film.create({title: req.body.title, rating: req.body.rating, synopsis: req.body.synopsis, releaseYear: req.body.releaseYear, imageUrl: req.body.imageUrl, studioId: req.body.studioId, genreId: req.body.genreId, countryId: req.body.countryId})
      .then(rows => res.json(rows))
      .catch(err => res.status(500).json(err));
  }
});
router.put('/film/update/:id', (req, res) => {
  const schema = joi.object({
    title: joi.string().required(),
    rating: joi.number().allow(null),
    synopsis: joi.string().allow(null, ''),
    releaseYear: joi.number(),
    imageUrl: joi.string().allow(null, ''),
    studioId: joi.number().required(),
    genreId: joi.number().required(),
    countryId: joi.number().required()
  });
  const {error, value} = schema.validate({
    title: req.body.title,
    rating: req.body.rating,
    synopsis: req.body.synopsis,
    releaseYear: req.body.releaseYear,
    imageUrl: req.body.imageUrl,
    studioId: req.body.studioId,
    genreId: req.body.genreId,
    countryId: req.body.countryId,
  });

  if(error){
    msg = error;
    res.status(400).json({msg: msg});
  }
  else{
  film.update({ title: req.body.title, rating: req.body.rating, synopsis: req.body.synopsis, releaseYear: req.body.releaseYear, imageUrl: req.body.imageUrl, studioId: req.body.studioId, genreId: req.body.genreId, countryId: req.body.countryId },{ where: { id: req.params.id } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});
router.delete('/film/delete/:id', (req, res) => {
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










router.get('/filmInLibrary/getAll', (req, res) => {
  filmInLibrary.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/filmInLibrary/get/:id', (req, res) => {
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

router.post('/filmInLibrary/create', (req, res) => {
  console.log('creating film in library')
  const schema = joi.object({
    filmId: joi.number().required(),
    serviceUserId: joi.number().required(),
    liked: joi.string().required(),
    watched: joi.string().required(),
    reviewed: joi.string().required(),
    review: joi.string().allow(null, '')
  });
  const {error, value} = schema.validate({
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

router.put('/filmInLibrary/update/:id', (req, res) => {
  console.log('creatingFilmInLibrary');
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
    filmInLibrary.update({ filmId: req.body.filmId, serviceUserId: req.body.serviceUserId, liked: req.body.liked, watched: req.body.watched, reviewed: req.body.reviewed, review: req.body.review },{ where: { id: req.params.id } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});
router.delete('/filmInLibrary/delete/:id', (req, res) => {
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
  filmInLibrary.destroy({where: { id: req.params.id }})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
});












router.get('/filmInList/getAll', (req, res) => {
  filmInList.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/filmInList/get/:id', (req, res) => {
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

router.post('/filmInList/create', (req, res) => {
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

router.put('/filmInList/update/:id', (req, res) => {
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
    filmInList.update({ filmId: req.body.filmId, filmListId: req.body.filmListId },{ where: { id: req.params.id } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});
router.delete('/filmInList/delete/:id', (req, res) => {
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











router.get('/filmList/getAll', (req, res) => {
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

router.post('/filmList/create', (req, res) => {
  const schema = joi.object({
    serviceUserId: joi.number().required(),
    filmListName: joi.string().required(),
    averageRating: joi.number().allow(null, '')
  });false
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

router.put('/filmList/update/:id', (req, res) => {
  console.log('updating film list');
  const schema = joi.object({
    id: joi.number().required(),
    serviceUserId: joi.number().required(),
    filmListName: joi.string().required(),
    averageRating: joi.number().allow(null, '')
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
    filmList.update({ serviceUserId: req.body.serviceUserId, filmListName: req.body.filmListName, averageRating: req.body.averageRating },{ where: { id: req.params.id } } )
  .then(count => {
      console.log('Rows updated ' + count);
  })
  .then(rows => res.json(rows))
  .catch(err => res.status(500).json(err));
}
});
router.delete('/filmList/delete/:id', (req, res) => {
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







router.get('/genre/getAll', (req, res) => {
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

router.post('/genre/create', (req, res) => {
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

router.put('/genre/update/:id', (req, res) => {
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
router.delete('/genre/delete/:id', (req, res) => {
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













router.get('/studio/getAll', (req, res) => {
  studio.findAll()
      .then( rows => res.json(rows))
      .catch( err => res.status(500).json(err));
});
router.get('/studio/get/:id', (req, res) => {
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

router.post('/studio/create', (req, res) => {
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

router.put('/studio/update/:id', (req, res) => {
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
router.delete('/studio/delete/:id', (req, res) => {
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


module.exports = router;