const express = require('express');
const app = express();
const List = require('../models/list');
const mdAutentication = require('../middlewares/autenticacion');

app.put('/:listId', mdAutentication.verifyToken, (req, res) => {
  const listId = req.params.listId;
  const body = req.body;
  List.findById(listId, (err, list) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar la lista',
        errors: err
      });
    }
    if (!list) {
      return res.status(400).json({
        ok: false,
        message: 'la lista con el id ' + listId + ' no existe',
        errors: {
          message: 'la lista con el id ' + listId + ' no existe'
        }
      });
    }
    list.itemList.forEach((item) => {
      if (item.itemId === body.itemId) {
        item.buyed = !item.buyed;
      }
    });
    list.save((err, list) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al acutalizar el producto',
          errors: {
            message: 'Error al acutalizar el producto',
          }
        });
      }
      res.status(200).json({
        ok: true,
        list: list
      });
    });
  });
});

app.put('/list/:listId/finished/:finished', mdAutentication.verifyToken, (req, res) => {
  const listId = req.params.listId;
  const body = req.body;
  List.findById(listId, (err, list) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar la lista',
        errors: err
      });
    }
    if (!list) {
      return res.status(400).json({
        ok: false,
        message: 'la lista con el id ' + listId + ' no existe',
        errors: {
          message: 'la lista con el id ' + listId + ' no existe'
        }
      });
    }
    list.itemList.forEach((item) => {
      if (item.itemId === body.itemId) {
        item.buyed = !item.buyed;
      }
    });
    list.save((err, list) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al acutalizar el producto',
          errors: {
            message: 'Error al acutalizar el producto',
          }
        });
      }
      res.status(200).json({
        ok: true,
        list: list
      });
    });
  });
});
app.put('/listshop/:listId', mdAutentication.verifyToken, (req, res) => {
  const listId = req.params.listId;
  console.log(listId);
  List.findById(listId, (err, list) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar la lista',
        errors: err
      });
    }
    if (!list) {
      return res.status(400).json({
        ok: false,
        message: 'la lista con el id ' + listId + ' no existe',
        errors: {
          message: 'la lista con el id ' + listId + ' no existe'
        }
      });
    }
    list.finished = true;
    list.save((err, list) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al acutalizar el producto',
          errors: {
            message: 'Error al acutalizar el producto',
          }
        });
      }
      res.status(200).json({
        ok: true,
        list: list
      });
    });
  });
});


module.exports = app;