const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  state: {
    type: Boolean,
    required: [true, 'El estado es obligatorio']
  }
});
userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('User', userSchema);