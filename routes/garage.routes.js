const { Router } = require('express');

const router = Router();
const {
	getUsers,
	getUser,
	getCars,
} = require('../controllers/garage.controllers');

// Users
router.get('/users', getUsers);
router.get('/users/:id', getUser);

// Cars
router.get('/cars', getCars);

module.exports = router;
