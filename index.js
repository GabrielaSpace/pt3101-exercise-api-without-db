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
app.use('/users', usersRoutes)//1.Crea el endpoint /users (GET) que devuelva todos los usuarios
app.use('/users/total', usersRoutes)//3.Crea el endpoint /users/total (GET) para devolver el total de usuarios
app.use('/users/vehicles?min=3&max=7', usersRoutes)//5.Crea el endpoint /users/vehicles (GET) para obtener email, username e imagen de los usuarioss que tengan un mínimo y un máximo de vehículos (req.query min y max)
//http://localhost:3000/users/vehicles?min=3&max=7
app.use('/users/foods',usersRoutes) //7.Crea el endpoint /foods (GET) para devolver una lista de todas las comidas registradas UNICAS de todos los usuarios
app.use('/users/username/:username',usersRoutes)//2.Crea el endpoint /users/:username (GET) que devuelva un único usuario en base al username (si hubiera varios, devuelve solo el primero)
app.use('/users/country/:country', usersRoutes)//4. Crea el endpoint /users/:country (GET) para devolver todos los usuarios de un país en concreto recibido por params
app.use('/users/food/:food',usersRoutes)//6. Crea el endpoint /users/:food (GET) para devolver todos los usuarios con una comida favorita en concreto a través de params
app.use('/users/vehiclesF?fuel&manufacturer&model',usersRoutes);// 8. Crea el endpoint /users/vehicles (GET) para obtener email, username e imagen de los usuarios que tenga, al menos, un coche con los detalles pasados por 
// query string (fuel, manufacturer y/o model. Si están los 3 se filtra por los 3, si falta alguno, se filtra solo por los que existen. Si no hay ninguno, se 
// saca la información de los usuarios que NO TIENEN COCHES)
////http://localhost:3000/users/vehicles?fuel&manufacturer&model
app.use('/vehicles', usersRoutes)//9.Crea el endpoint /vehicles (GET) para obtener la lista de coches únicos totales, junto con el total de ellos en base al tipo de 
//combustible (recibido por query strings ?fuel=diesel, por ejemplo). Si no se pasa ningún tipo de combustibles, se buscan por todo tipo de combustibles
app.use('/users',  usersRoutes);//10.Crea el endpoint /users (POST) para recibir información en req.body para crear un usuario nuevo. Evita que se puedan crear usuarios si no hay, en req.body: email, 
//firstname, lastname y username. Genera el id automáticamente (v4) (paquete uuid, más info en: https://www.npmjs.com/package/uuid). El resto de
// campos, si no están, crealos vacíos
app.use('/users/username/:username', usersRoutes );//11.Crea el endpoint /users/:username (PUT) para obtener información del usuario a través de req.body (menos el id, los vehículos,
// los alimentos y el campo deleted) y actualiza dicho usuario



app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto http://localhost:${PORT} ! ✨🦄`);
});

