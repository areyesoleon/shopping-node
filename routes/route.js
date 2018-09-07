const express = require('express');
const app = express();
const Route = require('../models/route');

app.get('/:id',(req,res) => {
  const id = req.params.id;
  Route.find({idModule: id})
  .exec((err,rutas) => {
    if(err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al buscar rutas',
        errors: err
      });
    }
    res.status(200).json({
      ok: true,
      rutas: rutas
    });
  })
});

module.exports = app;