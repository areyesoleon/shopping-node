const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

app.post('/', (req, res) => {
  const body = req.body;
  const user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password,13),
    state: body.state
  });

  user.save((err, userSaved) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Error al crear usuario',
        errors: err
      });
    }
    res.status(201).json({
      ok: true,
      user: userSaved
    });
  })
});

module.exports = app;
