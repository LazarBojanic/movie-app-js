const express = require('express');
const path = require('path');
const router = express.Router();
const cors = require('cors');
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({extended: true}));
const { sequelize, artist, crewMember, film, filmInLibrary, filmInList, filmList, serviceUser } = require('../models');
const options = {root: path.join(__dirname, '../static')};

router.get('/mainAdmin', (req, res) => {
    res.sendFile('mainAdmin.html', options);
    });
router.get('/mainModerator', (req, res) => {
    res.sendFile('mainModerator.html', options);
    });
router.get('/user/login', (req, res) => {
    res.sendFile('loginUser.html', options);
    });   
router.get('/userCRUD', (req, res) => {
    res.sendFile('userCRUD.html', options);
    });
router.get('/filmCRUD', (req, res) => {
    res.sendFile('filmCRUD.html', options);
    });
router.get('/artistCRUD', (req, res) => {
    res.sendFile('artistCRUD.html', options);
    });
router.get('/countryCRUD', (req, res) => {
    res.sendFile('countryCRUD.html', options);
    });
router.get('/crewMemberCRUD', (req, res) => {
    res.sendFile('crewMemberCRUD.html', options);
    });
router.get('/filmInLibraryCRUD', (req, res) => {
    res.sendFile('filmInLibraryCRUD.html', options);
    });
router.get('/filmInListCRUD', (req, res) => {
    res.sendFile('filmInListCRUD.html', options);
    });
router.get('/filmListCRUD', (req, res) => {
    res.sendFile('filmListCRUD.html', options);
    });
router.get('/genreCRUD', (req, res) => {
    res.sendFile('genreCRUD.html', options);
    });
router.get('/studioCRUD', (req, res) => {
    res.sendFile('studioCRUD.html', options);
    });

module.exports = router;