const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  finished: {
    type: Boolean,
    required: [true, 'El estado es obligatorio']
  },
  idPlace: {
    type: String,
    required: [true, 'El lugar es obligatorio']
  },
  itemList: {
    type: Object,
    required: [true, 'Tiene que seleccionar un producto']
  }
});

module.exports = mongoose.model('List', listSchema);