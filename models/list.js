const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemBuyed = require('./itemBuyed');
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
  itemList: [ItemBuyed],
  child: ItemBuyed
});

module.exports = mongoose.model('List', listSchema);