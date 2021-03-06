// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Inicializar variables
const app = express();

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Import Routes
const moduleRoutes = require('./routes/module');
const routeRoutes = require('./routes/route');
const userRoutes = require('./routes/user');
const placeRoutes = require('./routes/place');
const loginRoutes = require('./routes/login');
const itemRoutes = require('./routes/item');
const buyedRoutes = require('./routes/buyed');
const listRoutes = require('./routes/list');

//Conexion DB
mongoose.connection.openUri('mongodb://localhost:27017/weHome',(err,res)=>{
   if(err) throw err;
   console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online' );
});

app.use('/config/module',moduleRoutes);
app.use('/config/route',routeRoutes);
app.use('/admin/user',userRoutes);
app.use('/admin/place',placeRoutes);
app.use('/admin/item',itemRoutes);
app.use('/admin/list',listRoutes);
app.use('/admin/buyed',buyedRoutes);
app.use('/opt/login',loginRoutes);

//Escuchar peteciones
app.listen(3000, ()=>{
  console.log('express server 3000: \x1b[32m%s\x1b[0m', 'online' );
});