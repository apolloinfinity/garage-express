const Car = require('../models/car.models');
const User = require('../models/user.models');

exports.allCars = async (req, res) => {
  const cars = await Car.find({});
  res.json(cars);
};

exports.addCar = async (req, res) => {
  try {
    // Get params
    const { id } = req.params;
    // Create new car with model
    const newCar = new Car(req.body);

    // Get and find user
    const user = await User.findById({ _id: id });

    // Assign owner in newCar to user
    newCar.owner = user;

    // save car
    await newCar.save();

    // Add car to owner's  array
    user.cars.push(newCar);

    await user.save();
    res.status(201).json(newCar);
  } catch (err) {
    console.error(err);
  }
};
