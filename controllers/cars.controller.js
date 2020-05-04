const Car = require('../models/car.models');
const User = require('../models/user.models');

exports.getAllCars = async (req, res) => {
  const cars = await Car.find({});
  res.render('cars', {
    pageTitle: 'Cars',
    cars: cars,
  });
};

exports.addCar = async (req, res) => {
  try {
    // Get params
    const { id } = req.params;
    // console.log(id);
    // Get and find user
    const user = await User.findOne({ _id: id });
    // Create new car with model
    const newCar = new Car(req.body);

    // Assign owner in newCar to user
    newCar.owner = user._id;

    // save car
    await newCar.save();

    // Add car to owner's  array
    user.cars.push(newCar);

    console.log(newCar);
    await user.save();
    res.status(201).redirect(`/users/${id}`);
  } catch (err) {
    console.error(err);
  }
};
