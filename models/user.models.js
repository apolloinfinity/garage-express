const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	name: String,
	age: Number,
	cars: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Car',
		},
	],
});

const User = model('User', UserSchema);

module.exports = User;
