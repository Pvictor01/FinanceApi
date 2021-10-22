const express = require('express');
const { v4: uuidv4 } = require('uuid')

const database = require('../database/index');

const route = express.Router();

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

route.get('/user/:id', (request, response) => {
  const id = request.params.id

  const user = database.find(user => user.id == id)

  if (!user) {
    return response.status(401).json({error: 'User not found!'})
  }

  return response.status(201).json(user);
});

module.exports = route;