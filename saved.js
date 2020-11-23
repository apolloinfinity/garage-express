const { schema } = require('../knex');
// Migration
exports.up = async function(knex) {
	await createTable('garage_users', (table) => {
		table.increments('user_id').primary();
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.string('email').notNullable().unique();
	}).createTable('cars', (table) => {
		table.increments('car_id').primary();
		table.string('model').notNullable();
		table.string('make').notNullable();
		table.integer('year').notNullable();
		table.string('engine_type').notNullable();
		table.string('fuel_type').notNullable();
		table.boolean('hybrid').defaultTo(false);
		table.string('color').notNullable();
		table.integer('user_id').references('user_id').inTable('garage_users');
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTable('cars').dropTable('garage_users');
};
// End Migration

// Knex file
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
module.exports = require('knex')(config);
// end Knex file

// knexfile.js
require('dotenv').config();

module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.SQL_HOST,
			database: process.env.SQL_DBNAME,
			user: process.env.SQL_USER,
			password: process.env.SQL_PWD,
			port: process.env.SQL_PORT,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: __dirname + '/db/migrations',
		},
		seeds: {
			directory: __dirname + '/db/seeds',
		},
	},
	production: {
		connection: {
			host: process.env.SQL_HOST,
			database: process.env.SQL_DBNAME,
			user: process.env.SQL_USER,
			password: process.env.SQL_PWD,
			port: process.env.SQL_PORT,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: __dirname + '/db/migrations',
		},
		seeds: {
			directory: __dirname + '/db/seeds',
		},
	},
};

// end knexfile.js
