const path = require('path');
const fs = require('fs');

const express = require('express');
const favicon = require('express-favicon');
const cors = require('cors');
const logger = require('morgan');

require('dotenv').config();

const app = express();
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
	flags: 'a',
});

const port = process.env.PORT || 80;
const garage = require('./routes/garage.routes');

const start = async () => {
	try {
		app.use(favicon(__dirname + '/public/favicon.ico'));

		app.use(cors());
		app.use(logger('combined', { stream: accessLogStream }));
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));

		app.use(express.static(path.join(__dirname, 'public')));

		app.use('/garage', garage);

		app.listen(port, () => console.log(`Listening on port ${port}`));
	} catch (err) {
		console.error(err);
	}
};

start();
