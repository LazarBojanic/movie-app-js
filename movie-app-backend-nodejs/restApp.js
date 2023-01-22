const express = require('express');
const {sequelize} = require('./models');
const cors = require('cors');
const restRoutes = require('./routes/restRoutes');
const app = express();

app.use('/api', restRoutes);
app.use(cors({origin: '*'}));

app.listen({port: 8000}), async () =>{
  await sequelize.authenticate();
}