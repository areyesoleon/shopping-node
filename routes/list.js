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

app.get('/state/:finished/:idPlace', mdAutentication.verifyToken, (req, res) => {
  const finished = req.params.finished;
  const idPlace = req.params.idPlace;
  List.find({ finished: finished, idPlace: idPlace})
  .select('_id name')
    .exec((err, lists) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al buscar las listas',
          errors: {
            message: 'Error al buscar las listas'
          }
        });
      }
      if (!lists) {
        return res.status(400).json({
          ok: false,
          message: 'No tiene listas creadas',
          errors: {
            message: 'No tiene listas creadas'
          }
        })
      }
      res.status(200).json({
        ok: true,
        lists: lists
      });
    });
});
module.exports = app;
