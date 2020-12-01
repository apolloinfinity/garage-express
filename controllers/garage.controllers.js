const knex = require('../db/knex');
require('dotenv').config();

// Authentication
exports.createAccount = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;
};

// User methods
exports.getUsers = async (req, res) => {
	try {
		const users = await knex.select().from('users');

		res.status(200).json(users);
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await knex
			.select('first_name', 'email', 'model', 'make', 'year', 'color')
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
		// check req to see if user is admin to create other users.
		const { first_name, last_name, email } = req.body;
		const newUser = await knex('users')
			.insert({
				first_name,
				last_name,
				email,
			})
			.returning('first_name', 'last_name', 'email');

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
		res.status(200).json({ msg: 'User deleted' });
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

// Car methods
exports.getCars = async (req, res) => {
	try {
		const cars = await knex.select().from('cars');
		res.send(cars);
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.getCar = async (req, res) => {
	try {
		const id = await req.params.id;
		const car = await knex('cars').where('car_id', id);
		res.status(200).json(car);
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.newCar = async (req, res) => {
	try {
		const {
			user_id,
			model,
			make,
			year,
			engine_type,
			fuel_type,
			hybrid,
			color,
		} = await req.body;

		const newCar = await knex('cars')
			.insert({
				user_id,
				model,
				make,
				year,
				engine_type,
				fuel_type,
				hybrid,
				color,
			})
			.returning('car_id');

		res.status(200).json(newCar);
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.updateCar = async (req, res) => {
	try {
		const {
			user_id,
			model,
			make,
			year,
			engine_type,
			fuel_type,
			hybrid,
			color,
		} = await req.body;
		const id = await req.params.id;
		await knex('cars').where('car_id', id).update({
			user_id,
			model,
			make,
			year,
			engine_type,
			fuel_type,
			hybrid,
			color,
		});
		res.status(200).json({ msg: 'Car updated' });
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.deleteCar = async (req, res) => {
	try {
		const id = await req.params.id;
		await knex('cars').where('car_id', id).del();

		res.status(200).json({ msg: 'Car deleted' });
	} catch (err) {
		res.status(400).json({ err: err });
	}
};
