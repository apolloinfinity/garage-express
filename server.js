const path = require('path');

const express = require('express');
const favicon = require('express-favicon');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
require('./models/car.models');
require('./models/user.models');

const app = express();

const db = process.env.MONGO_URI;
const port = process.env.PORT || 80;
const garage = require('./app.routes');

const start = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log(
			`Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`
		);

		app.use(favicon(__dirname + '/public/favicon.ico'));
		app.use(cors());
		app.use(express.json());
		app.use(
			express.urlencoded({
				extended: true
			})
		);

		app.use('/', garage);

		app.listen(port, () => console.log(`Listening on port ${port}`));
	} catch (err) {
		console.error(err);
	}
};

start();
