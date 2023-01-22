const users = require('../db/users.json');

const getHome=(req, res) => {
    res.send('Hello World!')
  }

const getUsers= (req, res) => {
    res.status(200).json(users)
    }

const getTotal=(req, res) => {
    const total= users.length
    res.status(200).json({ total })
    }

const getVehicles=(req, res) => {
    const min = req.query.min;
    const max = req.query.max;
    let userFromVehicles = []
    for (let i = 0; i < users.length; i++) {
        if (users[i].vehicles.length >= min && users[i].vehicles.length <= max) {
            userFromVehicles.push({email:users[i].email,username:users[i].username,img:users[i].img})
        }
    }
    if (userFromVehicles.length === 0) {
        res.status(404).send({ message: `No se han encontrado usuarios con un minimo de ${min} y un maximo de ${max} de vehiculos` });
    } else {
        res.send(userFromVehicles);
    }
};

const getFoods=(req, res) => {
const foods=users.flatMap(user=>user.favouritesFood)
const Uniquefood= foods.filter((food, act,array)=> act=== array.indexOf(food) )
   res.status(200).json(Uniquefood)
}

const getByUsername= (req, res) => {
 const username = req.params.username;
let user = null;

for (let i = 0; i < users.length; i++) {
 if (users[i].username === username) {
    user = users[i];
    break;
    }
    }
    if (!user) {
        res.status(404).send({ message: 'No se ha encontrado el usuario' });
    } else {
        res.send(user);
    }
  }

const getUsersByCountry=(req, res) => {
    const country = req.params.country;
   
    let userCountry = null;
    // buscar en un array de usuarios
    for (let i = 0; i < users.length; i++) {
        if (users[i].address.country === country) {
            userCountry = users[i]
        }
    }
    if (!userCountry) {
        res.status(404).send({ message: `No se ha encontrado el pais ${country}` });
    } else {
        res.send(userCountry);
    }
    
  }
  
const getByFood=(req, res) => {
    const food = req.params.food;
    const usersWithAFood = users.filter(user => user.favouritesFood.includes(food));
    res.json(usersWithAFood);
  }

const getUserDetailsByVehicle=(req, res) => {

    let filteredVehicles = users.filter(user => {
      if (!user.vehicles.length) {
        return false;
      }
      let filteredByFuel;
      let filteredByManufacturer;
      let filteredByModel;
    
  
      if(req.query.fuel){
        filteredByFuel = user.vehicles.filter(vehicle => vehicle.fuel === req.query.fuel) 
      }else{
        filteredByFuel = user.vehicles
      }
  
      if(req.query.manufacturer){
        filteredByManufacturer = filteredByFuel.filter(vehicle => vehicle.manufacturer === req.query.manufacturer)
      }else{
        filteredByManufacturer = filteredByFuel;
      }
     
      if(req.query.model){
        filteredByModel = filteredByManufacturer.filter(vehicle => vehicle.model === req.query.model)
      }else{
        filteredByModel = filteredByManufacturer;
      }
      return filteredByModel.length > 0;
    });
    let userInfo = filteredVehicles.map(user => ({ email: user.email, username: user.username, img: user.img }));
    res.json(userInfo);
  }

const getVehiclesUniques=(req, res) => {
  
    const fuel = req.query.fuel;
    let uniqVehicles = []
  
    if (fuel) {
      uniqVehicles = getUniqueVehiclesByFuel(fuel);
      function getUniqueVehiclesByFuel(fuel) {
        return users.vehicles.filter((vehicle) => vehicle.fuel === fuel)
      }
    }
    
    else {
      uniqVehicles = getAllUniqueVehicles();
      function getAllUniqueVehicles() {
        return users.filter(user => user.vehicles);
      }
    }
    res.json(uniqVehicles);
  }

const createUser=(req, res) => {
    if (!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.username) {
        return res.status(400).json('Faltan datos, deberia tener: email, nombre, apellido, usuario ' );
    }
  
    let newUser = {
        id: uuid(),
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        otherfields: req.body.otherfields || "",
    };
  
    users.push(newUser);
  
    res.json(newUser);
  }

const editUser=(req, res) => {
    const username = req.params.username;
    const updatedUser = req.body;
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex === -1) {
        return res.status(404).json('Usuario no encontrado' );
    }
    delete updatedUser.id;
    delete updatedUser.vehicles;
    delete updatedUser.foods;
    delete updatedUser.deleted;
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    fs.writeFileSync(users, JSON.stringify(users));
    res.json('Usuario actualizado correctamente' );
  }

module.exports = {
getHome,
getUsers,
getTotal,
getVehicles,
getFoods,
getByUsername,
getUsersByCountry,
getByFood,
getUserDetailsByVehicle,
getVehiclesUniques,
createUser,
editUser}