const { Router } = require('express');
const router = Router();

const { allCars, addCar } = require('./controllers/cars.controller');
const {
  allUsers,
  createUser,
  findUser,
  getUserCars,
} = require('./controllers/users.controller');

router.get('/users', allUsers);
router.post('/users/create', createUser);
router.get('/users/:id', findUser);
router.get('/users/:id/cars', getUserCars);

router.get('/cars', allCars);
router.post('/cars/:id', addCar);

module.exports = router;
