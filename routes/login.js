const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
const User = require('../models/user');

app.post('/', (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al buscar usuario',
        errors: err
      });
    }
    if (!userDB) {
      return res.status(400).json({
        ok: false,
        message: 'Credenciales incorrectas',
        errors: err
      });
    }
    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        message: 'Credenciales incorrectas',
        errors: err
      });
    }
    userDB.password = '(~ ~)';
    const token = jwt.sign({ user: userDB }, SEED);
    return res.status(200).json({
      ok: true,
      token: token,
      user: userDB,
      id: userDB._id
    });
  });
});
module.exports = app;