const { Router } = require('express');
const router = Router();

const { getAllCars, addCar } = require('./controllers/cars.controller');
const { getUsers } = require('./controllers/users.controller');

router.get('/users', getUsers);

module.exports = router;
