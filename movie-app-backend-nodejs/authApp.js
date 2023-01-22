const express = require('express');
const {sequelize} = require('./models');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, "./static")));
app.use('/auth', authRoutes);
app.use(cors({origin: '*'}));

app.listen({port: 8500}), async () =>{
  await sequelize.authenticate();
}