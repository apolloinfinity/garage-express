exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('users').del().then(function() {
		// Inserts seed entries
		return knex('users').insert([
			{
				first_name: 'Javier',
				last_name: 'Ramirez',
				email: 'pustulio1@gmail.com',
			},
			{
				first_name: 'Jeremy',
				last_name: 'Clarkson',
				email: 'j.clarkson@amazon.com',
			},
			{
				first_name: 'Richard',
				last_name: 'Hammond',
				email: 'fast.hamster@amazon.com',
			},
			{
				first_name: 'James',
				last_name: 'May',
				email: 'cpt.slow@amazon.com',
			},
		]);
	});
};
