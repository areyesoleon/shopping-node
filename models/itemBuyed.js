const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemBuyedSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  itemId: {
    type: String,
    required: [true, 'El id del producto es obligatorio']
  },
  buyed: {
    type: Boolean,
    required: [true, 'El estado es obligatorio']
  }
});
module.exports = itemBuyedSchema