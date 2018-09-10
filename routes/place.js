const express = require('express');
const app = express();
const Place = require('../models/place');

app.post('/', (req, res) => {
  const body = req.body;
  const place = new Place({
    name: body.name,
    userId: body.userId,
    state: body.state
  });

  place.save((err, placeSaved) => {
    console.log(placeSaved);
    if(err){
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

module.exports = app;