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
		searchPath: [ 'knex', 'garage' ],
		migrations: {
			tableName: 'knex_migrations',
			directory: __dirname + '/db/migrations',
		},
		seeds: {
			directory: __dirname + '/db/seeds',
		},
	},
};
