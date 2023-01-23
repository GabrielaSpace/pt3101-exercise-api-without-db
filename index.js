const express = require("express");
const app = express();
const PORT = 3000;
const uuid = require('uuid');
const bodyParser = require('body-parser');
const fs = require('fs')
const users = require('./db/users.json');

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()) // habilitar el tipo a recibir en el server 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Módulos de Rutas
const usersRoutes = require('./routes/usersRoutes')

app.use('/', usersRoutes)
app.use('/users', usersRoutes)
app.use('/vehicles', usersRoutes)




app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto http://localhost:${PORT} ! ✨🦄`);
});

