const express = require('express');
const {sequelize} = require('./models');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, "./static")));
app.use('/admin', adminRoutes);
app.use(cors({origin: '*'}));


app.listen({port: 9000}), async () =>{
  await sequelize.authenticate();
}