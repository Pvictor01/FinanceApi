const express = require('express');

const routes = require('./routes/user.route')

const app = express();

app.use(express.json());

app.use(routes)

app.listen(3333)