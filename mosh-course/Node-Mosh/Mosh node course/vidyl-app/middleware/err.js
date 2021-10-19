const winston = require('winston')

module.exports = function(err, req, res, next) {
  winston.error(err.message, err)
  // log the exception
  res.status(500).send('Something failed!')
}