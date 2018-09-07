const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const routeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'El titulo es obligatorio']
  },
  icon: {
    type: String,
    required: [true, 'El icono es obligatorio']
  },
  idModule: {
    type: String,
    required: [true, 'El modulo es obligatorio']
  },
  routes: {
    type: Object,
    required: [true, 'Las rutas son obligatorias']
  }
});

module.exports = mongoose.model('Route', routeSchema);
