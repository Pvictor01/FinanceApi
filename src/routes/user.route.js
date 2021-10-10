const express = require('express');

const route = express.Router();

route.get('/user', (request, response) => {
  return response.status(201).send('ok');
});

module.exports = route;