const express = require('express');
const { sequelize, artist, crewMember, film, filmInLibrary, filmInList, filmList, serviceUser, studio, genre, country } = require('./models');
const restRoutes = require('./routes/restRoutes');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();
const path = require('path');
const distPath = path.join(__dirname, './dist');
const app = express();
const jwt = require('jsonwebtoken');
const joi = require('joi');

app.use('/', express.static(distPath));
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', restRoutes);
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    },
    allowEIO3: true
});

function authToken(token){
    try{
        //jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

io.on('connection', socket => {
    try{
        console.log('before headers');
        const bearerToken = socket.handshake.query.authorization;
        console.log('after headers');
        const token = bearerToken.split(' ')[1];
        console.log(bearerToken);
        if(authToken(token)){
            console.log('connection established');
            socket.on('addFilmToFilmList', data => {
                console.log(data);
    
                const schema = joi.object({
                    filmId: joi.number().required(),
                    filmListId: joi.number().required()
                });
                const {error, value} = schema.validate({
                    filmId: data.filmId,
                    filmListId: data.filmListId
                });
                
                if(error){
                    socket.emit("validationError", {message: "validation error"})
                }
                else{
                    filmInList.create({filmId: data.filmId, filmListId: data.filmListId}).then(() => {
                        filmInList.findAll({
                            attributes:['id'],
                            include: [
                              {
                                model: filmList,
                                attributes: [['id', 'filmListId'], 'filmListName', 'averageRating'],
                                where: {id: data.filmListId}
                              },
                              {
                                model: film,
                                attributes: [['id', 'filmId'], 'title', 'rating', 'releaseYear', 'imageUrl']
                              }
                            ]
                          })
                          .then(rows => {
                            socket.emit('filmAdded', rows);
                          });
                    })
                    .catch( err => socket.emit("databaseError", {message: err}));
    
                    
                }
                
              });
        }
        else{
            socket.emit("authenticationError", {message: "not authenticated"});
        }
    }
    catch(err){
        console.log('error');
    }
});



server.listen({ port: process.env.PORT || 8000 }, async () => {
    await sequelize.authenticate();
});