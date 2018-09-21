const express = require('express');
const app = express();
const List = require('../models/list');
const mdAutentication = require('../middlewares/autenticacion');

app.post('/', mdAutentication.verifyToken, (req, res) => {
  const body = req.body;
  const list = new List({
    name: body.name,
    finished: body.finished,
    idPlace: body.idPlace,
    itemList: body.itemList
  });

  list.save((err, listSaved) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Error al crear la lista',
        errors: err
      });
    }
    res.status(201).json({
      ok: true,
      list: listSaved
    });
  })
});
module.exports = app;
