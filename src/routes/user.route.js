const express = require('express');
const { v4: uuidv4 } = require('uuid')

const database = require('../database/index');

const route = express.Router();

route.get('/user', (request, response) => {
  return response.status(201).json(database);
});

route.post('/user', (request, response) => {
  const { name, cpf, email, date } = request.body;

  const user = {
    id: uuidv4(),
    name,
    cpf,
    email,
    date,
    created_at: new Date(),
    updated_at: new Date(),
  }

  database.push(user);

  return response.status(201).json(user)
});

module.exports = route;