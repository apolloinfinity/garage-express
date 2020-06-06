const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	name: String,
	age: Number,
	country: String,
	garage: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Vehicle'
		}
	],
	date_created: { type: Date, default: Date.now }
});

const User = model('User', UserSchema);

module.exports = User;
