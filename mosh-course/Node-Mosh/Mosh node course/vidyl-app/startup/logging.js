const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
  winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'logfile.log'}),
      new winston.transports.MongoDb({
    db: 'mongodb://localhost/vidly',
level: 'info'
      })
    ],
  });

  process.on('unhandledRejection', (ex) => {
    throw ex
  })

}