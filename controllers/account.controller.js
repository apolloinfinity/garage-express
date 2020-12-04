const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knex = require('../db/knex');
// require('dotenv').config();
const key = process.env.JWT_SECRET;

// Authentication
exports.register = async (req, res) => {
	try {
		const { first_name, last_name, email, password } = await req.body;

		// encrypt password
		const hashPassword = bcrypt.hashSync(password, 10);
		// save to db
		await knex('users').whereNotExists().insert({
			first_name,
			last_name,
			email,
			password: hashPassword,
		}); // Migrations already has email that has a unique constraint

		res.status(201).json({ msg: 'User was registered' });
	} catch (err) {
		// res.status(400).json({ err: err['code'] });
		res.status(400).json({ msg: err });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = await req.body;
		// Find user in DB
		const user = await knex('users').where('email', email).first();
		if (!user) {
			return res.status(403).json({ err: "User doesn't exists" });
		}

		// Compare password
		const checkPassword = await bcrypt.compare(password, user.password);
		if (!checkPassword) {
			return res.status(403).json({ err: 'Wrong username or password' });
		}
		const token = jwt.sign(
			{
				id: user.user_id,
				user: user.first_name,
				email: user.email,
			},
			key,
			{ expiresIn: '60s' }
		);
		//
		res.status(200).json({
			success: true,
			token: `Bearer ${token}`,
		});

		// Create token
	} catch (err) {
		res.status(400).json(err);
	}
};
