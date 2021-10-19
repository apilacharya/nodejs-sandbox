const Joi = require('joi');
const mongoose= require('mongoose')

const genreSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true,
    minlength:5,
    maxlegth:50
  }
})

const Genre = mongoose.model('Genre',  genreSchema)



function validateGenre(data) {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
  });
  return schema.validate(data);
}

module.exports = {
  genreSchema,
  Genre,
 validate: validateGenre
}
