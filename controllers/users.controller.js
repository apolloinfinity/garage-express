const User = require('../models/user.models');

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({}).populate('garage');
		res.json(users);
	} catch (error) {
		throw err;
	}
};

exports.createUser = async (req, res) => {
	try {
		const { name, age, country } = await req.body;

		const newUser = User({ name, age, country });
		newUser.save();
		res.json('User Created');
	} catch (error) {
		throw err;
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const id = await req.params.id;
		await User.findOneAndDelete({ _id: id });
		res.json('User deleted');
	} catch (error) {
		throw err;
	}
};
