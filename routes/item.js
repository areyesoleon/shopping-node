const express = require('express');
const app = express();
const Item = require('../models/item');
const mdAutentication = require('../middlewares/autenticacion');
app.post('/', mdAutentication.verifyToken, (req, res) => {
  const body = req.body;
  const userId = req.user._id;
  const item = new Item({
    name: body.name,
    userId: userId,
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

app.get('/', mdAutentication.verifyToken, (req, res) => {
  const userId = req.user._id
  Item.find({ userId: userId })
    .exec((err, items) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al buscar los productos',
          errors: {
            message: 'Error al buscar los productos'
          }
        })
      }
      if (!items) {
        return res.status(400).json({
          ok: false,
          message: 'No tiene lugares creados',
          errors: {
            message: 'No tiene lugares creados'
          }
        });
      }
      res.status(200).json({
        ok: true,
        items: items
      });
    })
});

app.get('/state/:state', mdAutentication.verifyToken, (req, res) => {
  const userId = req.user._id
  const state = req.params.state;
  Item.find({ userId: userId, state: state })
    .exec((err, items) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al buscar los productos',
          errors: {
            message: 'Error al buscar los productos'
          }
        })
      }
      if (!items) {
        return res.status(400).json({
          ok: false,
          message: 'No tiene lugares creados',
          errors: {
            message: 'No tiene lugares creados'
          }
        });
      }
      res.status(200).json({
        ok: true,
        items: items
      });
    })
});

app.get('/state/:state/toList', mdAutentication.verifyToken, (req, res) => {
  const userId = req.user._id
  const state = req.params.state;
  Item.find({ userId: userId, state: state })
  .select('_id name')
    .exec((err, items) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al buscar los productos',
          errors: {
            message: 'Error al buscar los productos'
          }
        })
      }
      if (!items) {
        return res.status(400).json({
          ok: false,
          message: 'No tiene lugares creados',
          errors: {
            message: 'No tiene lugares creados'
          }
        });
      }
      res.status(200).json({
        ok: true,
        items: items
      });
    })
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
