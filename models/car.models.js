const { Schema, model } = require('mongoose');

const CarSchema = new Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    require: true,
  },
  year: {
    type: Number,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Car = model('Car', CarSchema);

module.exports = Car;
