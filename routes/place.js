const express = require('express');
const app = express();
const Place = require('../models/place');
const mdAutentication = require('../middlewares/autenticacion');

app.post('/', (req, res) => {
  const body = req.body;
  const place = new Place({
    name: body.name,
    userId: body.userId,
    state: body.state
  });

  place.save((err, placeSaved) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Error al crear el lugar',
        errors: err
      });
    }
    res.status(201).json({
      ok: true,
      place: placeSaved
    });
  });
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  Place.findById(id)
    .exec((err, place) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al buscar lugar',
          errors: err
        });
      }
      if (!place) {
        return res.status(400).json({
          ok: false,
          message: 'El lugar con el id ' + id + ' no existe',
          errors: {
            message: 'El lugar con el id ' + id + ' no existe'
          }
        });
      }
      res.status(200).json({
        ok: true,
        place: place
      })
    });
});

app.get('/', mdAutentication.verifyToken, (req, res) => {
  const userId = req.user._id;
  Place.find({ userId: userId })
    .exec((err, places) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al buscar los lugares',
          errors: {
            message: 'Error al buscar los lugares'
          }
        })
      }
      if (!places.length) {
        return res.status(400).json({
          ok: false,
          message: 'No tiene lugares creados',
          errors: {
            message: 'No tiene lugares creados'
          }
        })
      }
      res.status(200).json({
        ok: true,
        places: places
      })
    })
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Place.findById(id, (err, place) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al actualizar el lugar',
        errors: err
      });
    }
    if (!place) {
      return res.status(400).json({
        ok: false,
        message: 'El lugar con el id ' + id + ' no existe',
        errors: {
          message: 'El lugar con el id ' + id + ' no existe'
        }
      })
    }
    place.name = body.name;
    place.state = body.state;
    place.save((err, place) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al actualizar el lugar',
          errors: err
        });
      }
      res.status(200).json({
        ok: true,
        place: place
      });
    })
  });
});

module.exports = app;