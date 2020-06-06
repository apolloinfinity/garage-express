const { Vehicle, Engine } = require('../models/garage.models');
const User = require('../models/user.models');

exports.getAllVehicles = async (req, res) => {
	try {
		const vehicle = await Vehicle.find({});
		res.json(vehicle);
	} catch (error) {
		throw error;
	}
};

exports.getUserVehicles = async (req, res) => {
	try {
		const { id } = await req.params;
		const userVehicles = await User.find({ _id: id });

		res.json(userVehicles);
	} catch (error) {
		throw error;
	}
};

exports.addVehicle = async (req, res) => {
	try {
		// Get params
		const { id } = await req.params;

		// Get and find user
		const user = await User.findOne({ _id: id });
		// Create new car with model
		const { make, model, year, cylinders, horsepower } = await req.body;
		const newVehicle = new Vehicle({
			make,
			model,
			year,
			engine: { cylinders, horsepower }
		});

		// Assign owner in newCar to user
		newVehicle.owner = user._id;

		// save car
		await newVehicle.save();

		// Add car to owner's  array
		user.garage.push(newVehicle);

		// console.log(newCar);
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		throw error;
	}
};

exports.deleteVehicle = async (req, res) => {
	try {
		const { car_id, owner } = await req.body;
		// console.log(req.body);

		// Delete car from vehicles collection
		const deleteVehicle = await Vehicle.findByIdAndDelete({ _id: car_id });
		// Delete same car id from User garage array
		const deleteVehicleFromUser = await User.findByIdAndUpdate(
			{ _id: owner },
			{ $pull: { garage: deleteVehicle._id } }
		);
		// Delete vehicle from the user collection and save it.
		deleteVehicleFromUser.save();
		res.json('Delete vehicle from Garage');
	} catch (error) {
		throw error;
	}
};
