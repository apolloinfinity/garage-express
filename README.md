# Garage Demo
I love cars. I love everything about their design, the engineering, the engines/motors, and what their energy source is. 
I have much love for the old tried and true gasoline/diesel engines but I absolutely love the new hybrid and fully electric supercars. 

This project is based on a dream of maybe, hopefully owning either good ole' American Muscle car or something like a Tesla Model S. Basically it's a wish list.

## Technologies
Previous iteration of this project was based on using Mongodb for storing data. MongoDB is great at what it does but I felt that this project could definitely benefit greatly with SQL's relational methods.

* Node.js/Express
* Knex.js
* Angular 11+ for Front-end
* TailwindCSS


### Knex commands
```bash
$ npx knex migrate:make name_of_tables
$ npx init knex
$ npx knex migrate:make name_of_migration
$ npx knex migrate:latest *creating tables
$ npx knex seed:make name_of_seed
$ npx knex seed:run
# Run a specific seed
$ npx knex seed:run --specific=specific-seed.js
```

req.params.id = url/user/1
req.query = url/user?id=1

* Use return in if/else statements so that a "Cannot set headers after they are sent 
to the client" doesn't happen

Moving from MongoDB to SQL using Knex.js