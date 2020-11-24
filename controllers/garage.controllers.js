const { from } = require('../db/knex');
const knex = require('../db/knex');
require('dotenv').config();

// User methods
exports.getUsers = async (req, res) => {
	try {
		let users = await knex.select().from('users');

		res.status(200).send(users);
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.getUser = async (req, res) => {
	try {
		let user = await knex
			.select('first_name', 'model', 'make', 'year', 'color')
			.from('users')
			.innerJoin('cars', 'users.user_id', 'cars.user_id')
			.where('cars.user_id', req.params.id);

		res.status(200).send(user);
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.createUser = async (req, res) => {
	try {
	} catch (err) {}
};

// Car methods
exports.getCars = async (req, res) => {
	try {
		let cars = await knex.select().from('cars');

		res.send(cars);
	} catch (err) {
		res.status(400).send(err);
	}
};
