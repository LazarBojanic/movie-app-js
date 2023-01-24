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

router.post('/register', (req, res) => {
  console.log('registiring');
  
  const { username, email, pass, userRole } = req.body;
  console.log(`${username} ${email} ${pass} ${userRole}`);
  if(username == null || email == null || pass == null || userRole == null){
    return res.status(400).json({ 'message': 'Username, email and password are required.' });
  }
  /*if(serviceUser.findOne({where: {email: email}})){
    return res.status(409).json({ 'message': 'Email already in use.' });
  }*/
  try{
    const hashedPass = bcrypt.hashSync(pass, 10);
    serviceUser.create({username: username, email: email, pass: hashedPass, userRole: userRole})
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
  }
  catch(err){
    res.status(500).json({ 'message': err.message });
  }
});
router.post('/login', (req, res) => {
  console.log('logging in');
  const { email, pass } = req.body;
  const foundUser = null;
  serviceUser.findOne({where: { email: email }})
      .then( row => {
        const match = bcrypt.compareSync(pass, row.pass);
        if(row != null){
          if(match){
            const token = jwt.sign(
              { "id:": row.id,
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

module.exports = router;