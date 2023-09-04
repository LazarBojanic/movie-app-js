const express = require('express');
const {sequelize} = require('./models');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const app = express();
const path = require('path');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(express.static(path.join(__dirname, "./static")));
app.use('/admin', adminRoutes);
app.use(cors({origin: '*'}));


app.listen({port: 9000}), async () =>{
  await sequelize.authenticate();
}