const Car = require('../models/car.models');
const User = require('../models/user.models');

exports.findUser = async (req, res) => {
  const id = await req.query.id;
  console.log(id);
  let user = await User.findOne({ _id: await req.params.id });
  //   console.log(user);
  res.json(user);
};

exports.allUsers = async (req, res) => {
  let allUsers = await User.find();
  res.json(allUsers);
};

exports.createUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    const user = User({ name, age });
    await user.save();
    res.status(201).send('User Created');
  } catch (err) {
    console.error(err);
  }
};

exports.getUserCars = async (req, res) => {
  try {
    const { id } = await req.params;
    console.log(id);

    let foundUser = await User.findOne({ _id: id }).populate('cars');
    res.status(200).json(foundUser);
  } catch (err) {
    console.error(err);
  }
};
