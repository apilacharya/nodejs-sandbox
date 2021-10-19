const error = require('../middleware/err')
const customers = require('../routes/customers.js');
const genres = require('../routes/genres.js');
const rentals = require('../routes/rental.js');
const movies = require('../routes/movie.js');
const users = require('../routes/users');
const auth = require('../routes/auth.js');
const home = require('../routes/home.js');
const express = require('express')

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/', home);
  app.use('/api/customers', customers);
  app.use('/api/rentals', rentals);
  app.use('/api/movies', movies);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error)
}