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

app.get('/:id', (req, res) => {
  const id = req.params.id;
  Item.findById(id)
    .exec((err, item) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al buscar producto',
          errors: err
        })
      }
      if (!item) {
        return res.status(400).json({
          ok: false,
          message: 'No se encontro el producto',
          errors: {
            message: 'No se encontro el producto'
          }
        });
      }
      res.status(200).json({
        ok: true,
        item: item
      });
    });
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Item.findById(id, (err, item) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar el lugar',
        errors: err
      })
    }
    if (!item) {
      return res.status(400).json({
        ok: false,
        message: 'El producto con el id ' + id + 'no existe',
        errors: {
          message: 'El producto con el id ' + id + 'no existe'
        }
      })
    }
    item.name = body.name;
    item.state = body.state;
    item.save((err, item) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al actualizar el producto',
          errors: {
            message: 'Error al actualizar el producto'
          }
        })
      }
      res.status(200).json({
        ok: true,
        item: item
      })
    });
  });
})
module.exports = app;
