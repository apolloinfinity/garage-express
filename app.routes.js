const { Router } = require('express');
const router = Router();

const { allCars, addCar } = require('./controllers/cars.controller');
const {
  index,
  allUsers,
  createUser,
  getUser,
  getUserCars,
} = require('./controllers/users.controller');

router.get('/', index);

router.get('/users', allUsers);
router.post('/users', createUser);
router.get('/users/:id', getUser);
router.get('/users/:id/cars', getUserCars);

router.get('/cars', allCars);
router.post('/cars/:id', addCar);

module.exports = router;
