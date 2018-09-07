const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moduleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  icon: {
    type: String,
    required: [true, 'El icono el obligatorio']
  },
  disabled: {
    type: Boolean,
    required: [true, 'El estado es obligatorio']
  }
});

module.exports = mongoose.model('Module', moduleSchema);
