const { Router } = require('express');

const router = Router();
const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	getCars,
} = require('../controllers/garage.controllers');

// Users
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser); // use req.params to get id value

// Cars
router.get('/cars', getCars);

module.exports = router;
