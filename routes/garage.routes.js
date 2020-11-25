const { Router } = require('express');

const router = Router();
const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	getCar,
	getCars,
	newCar,
	updateCar,
	deleteCar,
} = require('../controllers/garage.controllers');

// Users
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser); // use req.params to get id value
router.delete('/users/:id', deleteUser); // use req.params to get id value

// Users and their vehicles
router.get('/cars', getCars); // route should be accessed by everybody
router.get('/cars/:id', getCar);
router.post('/cars', newCar);
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

module.exports = router;
