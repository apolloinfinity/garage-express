const User = require('../models/user.models');

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({}).populate('cars');
		res.json(users);
	} catch (error) {
		throw err;
	}
};
