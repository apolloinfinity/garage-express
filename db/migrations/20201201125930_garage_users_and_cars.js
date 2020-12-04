// Migration
exports.up = async function(knex) {
	await knex.schema.createTable('users', (table) => {
		table.increments('user_id').primary();
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.string('email').notNullable().unique();
		table.string('password').notNullable();
		// Postgres supports created_at with NOW() but needs new function and a trigger to do updates
		table.timestamps(false, true);
	}).raw(`
	CREATE TRIGGER update_timestamp
	BEFORE UPDATE
	ON users
	FOR EACH ROW
	EXECUTE PROCEDURE update_timestamp();
  `);
	await knex.schema.createTable('cars', (table) => {
		table.increments('car_id').primary();
		table.string('model').notNullable();
		table.string('make').notNullable();
		table.integer('year').notNullable();
		table.string('engine_type').notNullable();
		table.string('fuel_type').notNullable();
		table.boolean('hybrid').defaultTo(false);
		table.string('color').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.integer('user_id').references('user_id').inTable('users');
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTable('cars').dropTable('users');
};
