const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const placeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  userId:{
    type: String,
    required:[true, 'El id usuario es obligatorio']
  },
  state:{
    type: Boolean,
    required:[true, 'El estado es obligatorio']
  }
});
module.exports = mongoose.model('Place',placeSchema);