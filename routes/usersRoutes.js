const express = require("express");
const usersRouter = express.Router();
const usersController =require('../controllers/usersController')

usersRouter.get('/', usersController.getHome)
usersRouter.get('/users', usersController.getUsers)//1
usersRouter.get('/users/total', usersController.getTotal)//3
usersRouter.get('/users/vehicles', usersController.getVehicles)//5
usersRouter.get('/users/foods', usersController.getFoods)//7
usersRouter.get('/users/country/:country', usersController.getUsersByCountry)//4
usersRouter.get('/users/username/:username', usersController.getByUsername)//2

usersRouter.get('/users/food/:food', usersController.getByFood)//6
usersRouter.get('/users/vehiclesF', usersController.getUserDetailsByVehicle)//8
usersRouter.get('/vehicles', usersController.getVehiclesUniques)//9
usersRouter.post('/users/create/', usersController.createUser)//10
usersRouter.put('/users/username/:username', usersController.editUser)//11

                          

module.exports = usersRouter;