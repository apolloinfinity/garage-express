const path = require('path');

const mongoose = require('mongoose');
const express = require('express');

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
      dbName: 'garage',
    });
    console.log(
      `Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`
    );

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.set('view engine', 'ejs');
    app.set('views', 'views');

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(
      '/css',
      express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/'))
    );

    app.use('/', garage);

    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (err) {
    console.error(err);
  }
};

start();
