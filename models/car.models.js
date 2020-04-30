const { Schema, model } = require('mongoose');

const CarSchema = new Schema({
  make: String,
  model: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Car = model('Car', CarSchema);

module.exports = Car;
