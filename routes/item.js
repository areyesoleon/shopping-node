const express = require('express');
const app = express();
const Item = require('../models/item');

app.post('/', (req, res) => {
  const body = req.body;
  const item = new Item({
    name: body.name,
    userId: body.userId,
    state: body.state,
  });

  item.save((err, itemSave) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Error al crear producto',
        errors: err
      });
    }
    res.status(201).json({
      ok: true,
      item: itemSave
    });
  });
});
module.exports = app;
