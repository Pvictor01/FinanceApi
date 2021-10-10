const express = require('express');

const database = require('../database/index');

const route = express.Router();

route.get('/user', (request, response) => {
  return response.status(201).json(database);
});

route.post('/user', (request, response) => {
  const { name, cpf, email, date } = request.body;

  database.push({
    name,
    cpf,
    email,
    date,
    created_at: new Date(),
    updated_at: new Date()
  });

  return response.status(201).json({message: 'User created!'})
});

module.exports = route;