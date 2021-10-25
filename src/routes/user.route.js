const express = require('express');
const { v4: uuidv4 } = require('uuid');

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
  };

  database.push(user);

  return response.status(201).json(database);
});

route.get('/user/:id', (request, response) => {
  const id = request.params.id;

  const user = database.find(user => user.id == id);

  if (!user) {
    return response.status(401).json({error: 'User not found!'})
  };

  return response.status(201).json(database);
});

route.put('/user/:id', (request, response) => {
  const { id } = request.params;
  const { name, cpf, email, date} = request.body;

  const index = database.findIndex(user => user.id === id);

  if(index < 0) {
    return response.status(401).json({error: 'User not found!'});
  };

  const user = database[index];

  user.name = name;
  user.cpf = cpf;
  user.email = email;
  user.date = date;
  
  return response.status(201).json(user)
});

route.delete('/user/:id', (request, response) => {
  const { id } = request.params;

  const index = database.findIndex(user => user.id === id)

  if(index < 0) {
    return response.status(401).json({error: 'User not found!'})
  }

  database.splice(index, 1)

  return response.status(200).json({message: 'User deleted!'})
})

module.exports = route;