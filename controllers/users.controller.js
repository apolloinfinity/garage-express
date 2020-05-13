const User = require('../models/user.models');

exports.index = async (req, res) => {
	const users = await User.find({});
	res.render('index', {
		pageTitle: 'Garage Demo',
		users: users,
	});
};

exports.getUser = async (req, res) => {
	try {
		const { id } = await req.params;
		let user = await User.findOne({ _id: id }).populate('cars');
		// console.log(user);
		if (!user) {
			res.redirect('/');
		} else {
			res.render('user', {
				pageTitle: user.name,
				user: user,
			});
		}
	} catch (err) {
		console.error(err);
	}
};

exports.allUsers = async (req, res) => {
	let allUsers = await User.find();
	res.json(allUsers);
};

exports.createUser = async (req, res) => {
	try {
		// console.log(req.body);
		const { name, age } = req.body;

		const user = User({ name, age });
		// console.log(user);
		await user.save();
		res.status(201).redirect('/');
	} catch (err) {
		console.error(err);
	}
};

exports.getUserCars = async (req, res) => {
	try {
		const { id } = await req.params;
		console.log(id);

		let user = await User.findOne({ _id: id }).populate('cars');
		if (!user) {
			res.redirect('/');
		} else {
			res.status(200).json(user.cars);
		}
	} catch (err) {
		console.error(err);
	}
};
