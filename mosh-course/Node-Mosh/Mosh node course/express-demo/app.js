const debug = require('debug')('app:startup')
const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require('joi');
const modular = require('./logger')
const express = require('express');
const  courses = require('./courses')
const home = require('./home.js')
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`) // undefined
console.log(`app:${app.get('env')}`)

app.use(express.json()); //req.body
app.use(express.urlencoded({extended: true})); //key=value&key=value
app.use(express.static('public'))
app.use(helmet())
app.use('/api/courses', courses)
app.use('/', home)

// Configuration
console.log(`Application Name:${config.get('name')}`)
console.log(`Mail Server:${config.get('mail.host')}`)
console.log(`Mail Password:${config.get('mail.password')}`)


if(app.get('env') === 'development'){
  app.use(morgan('tiny'))
debug('Morgan enabled..') //console.log()
}



app.use(modular.log)
app.use(modular.authenticate)






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
