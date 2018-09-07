const express = require('express');
const app = express();
const Module = require('../models/module');

app.get('/', (req, res) => {
  Module.find()
    .exec((err, module) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al cargar los modulos',
          errors: err
        });
      }
      if(module.length === 0){
        return res.status(400).json({
          ok: false,
          message: 'Los modulos no fueron encontrados',
          errors:{
            message: 'No existen los modulos'
          }
        });
      }
      res.status(200).json({
        ok: true,
        modules: module
      })
    })
});
module.exports = app;
