const express = require('express');
const path = require('path');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({extended: true}));
const { sequelize, serviceUser } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const joi = require('joi');

router.post('/register', (req, res) => {
  console.log('registiring');

  const data = {
    email: req.body.email,
    username: req.body.username,
    pass: req.body.pass,
    userRole: req.body.userRole
  }

  const schema = joi.object({
      email: joi.string().required(),
      username: joi.string().required(),
      pass: joi.string().required().min(5),
      userRole: joi.string().required(),
  });
  const { error } = schema.validate({email: data.email, username: data.username, pass: data.pass, userRole: data.userRole});
  if (error) {
      console.log(error);
  }

  serviceUser.findOne({where: {email: data.email}}).then(res => {
    if(res){
      return res.status(409).json({ 'message': 'Email already in use.' });
    }
  });
  try{
    const hashedPass = bcrypt.hashSync(data.pass, 10);
    serviceUser.create({username: data.username, email: data.email, pass: hashedPass, userRole: data.userRole})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
  catch(err){
    res.status(500).json({ 'message': err.message });
  }
});
router.post('/login', (req, res) => {
  console.log('logging in');

  const data = {
    email: req.body.email,
    pass: req.body.pass
  }

  const schema = joi.object({
      email: joi.string().required(),
      pass: joi.string().required().min(5),
  });
  const { error } = schema.validate({email: data.email, pass: data.pass});
  if (error) {
      console.log(error);
  }


  const foundUser = null;
  serviceUser.findOne({where: { email: data.email }})
      .then( row => {
        const match = bcrypt.compareSync(data.pass, row.pass);
        if(row != null){
          if(match){
            const token = jwt.sign(
              { "id": row.id,
                "email": row.email,
                "userRole": row.userRole
               },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '12h' }
            )
            //console.log(token);
            res.json({ token: token });
          }
          else{
            return res.status(400).json({ 'message': 'Incorrect username or password.' });
          }
        }
        else{
          return res.status(400).json({ 'message': ' Email not found. '});
        }

      })
      .catch( err => res.status(500).json(err));
});

router.post('/getTokenRole', (req, res) => {
  const { token } = req.body;
  const decodedToken = jwt_decode(token);
    //console.log(decodedToken.userRole);
    res.json({ userRole: decodedToken.userRole });
});
router.get('/logout', (req, res) => {
  console.log('logging out');
  const token = jwt.sign(
      { 
      "id": 0,
      "email": '',
      "userRole": 'guest'
      },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '12h' }
  )
  console.log(token);
  res.json({ token: token });
});

module.exports = router;