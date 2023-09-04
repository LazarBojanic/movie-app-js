const express = require('express');
const { sequelize } = require('./models');
const restRoutes = require('./routes/restRoutes');
const cors = require('cors');
const http = require('http');
require('dotenv').config();
const path = require('path');
const distPath = path.join(__dirname, './dist');
const app = express();
const jwt = require('jsonwebtoken');
const joi = require('joi');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use('/', express.static(distPath));
var corsOptions = {
        origin: '*',
        methods: ['HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        credentials: true
}
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', restRoutes);
const server = http.createServer(app);

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

server.listen({ port: process.env.PORT || 8001 }, async () => {
    await sequelize.authenticate();
});