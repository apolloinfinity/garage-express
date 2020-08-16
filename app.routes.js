const { Router } = require('express');
const router = Router();

const {
	getAllVehicles,
	getUserVehicles,
	addVehicle,
	deleteVehicle
} = require('./controllers/garage.controller');
const { getUsers, createUser, deleteUser } = require('./controllers/users.controller');

router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);

router.get('/users/:id', getUserVehicles);
router.post('/users/:id', addVehicle);

router.get('/garage', getAllVehicles);
router.put('/garage', deleteVehicle);

module.exports = router;
