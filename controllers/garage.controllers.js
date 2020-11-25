const { from, first } = require('../db/knex');
const knex = require('../db/knex');
require('dotenv').config();

// User methods
exports.getUsers = async (req, res) => {
	try {
		let users = await knex.select().from('users');

		res.status(200).json(users);
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.getUser = async (req, res) => {
	try {
		let user = await knex
			.select('first_name', 'model', 'make', 'year', 'color')
			.from('users')
			.innerJoin('cars', 'users.user_id', 'cars.user_id')
			.where('cars.user_id', req.params.id);

		res.status(200).json({ user: user });
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.createUser = async (req, res) => {
	try {
		const { first_name, last_name, email } = req.body;
		let newUser = await knex('users').insert({
			first_name,
			last_name,
			email,
		});

		res.status(200).json({ user: newUser });
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.updateUser = async (req, res) => {
	try {
		const { first_name, last_name, email } = await req.body;

		await knex('users').where('user_id', await req.params.id).update({
			first_name: first_name,
			last_name: last_name,
			email: email,
		});
		const updatedUser = await knex('users').where('user_id', req.params.id);
		res.status(200).json({ user: updatedUser });
	} catch (err) {
		res.status(400).json({ err: err });
	}
};
exports.deleteUser = async (req, res) => {
	try {
		const id = await req.params.id;
		await knex('users').where('user_id', id).del();
		let users = await knex.select().from('users');
		res.status(200).json(users);
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

// Car methods
exports.getCars = async (req, res) => {
	try {
		let cars = await knex.select().from('cars');

		res.send(cars);
	} catch (err) {
		res.status(400).json({ err: err });
	}
};
