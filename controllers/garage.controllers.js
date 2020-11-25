const { from, first } = require('../db/knex');
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

		res.status(200).json(user);
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.createUser = async (req, res) => {
	try {
		// const { first_name, last_name, email } = req.body;
		let newUser = await knex('users').insert({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
		});

		res.status(200).json(newUser);
		console.log(req.body);
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.updateUser = async (req, res) => {
	try {
	} catch (err) {
		res.status(400).json({ err: error });
	}
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
