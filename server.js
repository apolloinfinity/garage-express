const path = require('path');

const express = require('express');
const favicon = require('express-favicon');

require('dotenv').config();
require('./models/car.models');
require('./models/user.models');

const app = express();

const port = process.env.PORT || 80;
const garage = require('./app.routes');

const start = async () => {
	try {
		app.use(favicon(__dirname + '/public/favicon.ico'));
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));

		app.use(express.static(path.join(__dirname, 'public')));
		app.use(
			'/css',
			express.static(
				path.join(__dirname, '/node_modules/bootstrap/dist/css/')
			)
		);

		app.use('/', garage);

		app.listen(port, () => console.log(`Listening on port ${port}`));
	} catch (err) {
		console.error(err);
	}
};

start();
