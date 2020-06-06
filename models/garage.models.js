const { Schema, model } = require('mongoose');

const EngineSchema = new Schema(
	{
		cylinders: Number,
		cylinder_configuration: String,
		horsepower: Number
	},
	{ _id: false }
);

const VehicleSchema = new Schema({
	make: {
		type: String,
		required: true
	},
	model: {
		type: String,
		require: true
	},
	year: {
		type: Number,
		required: true
	},
	engine: EngineSchema,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Vehicle = model('Vehicle', VehicleSchema);
const Engine = model('Engine', EngineSchema);

module.exports = {
	Vehicle,
	Engine
};
