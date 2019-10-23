'use strict';

const express = require('express');

const app = express();

let db = [];

app.use(express.json());

// middleware
function logger(message) {
  return function requestTime (request, response, next) {
    request.requestTime = Date.now();
    console.log(`${request.requestTime} ${request.path} ${request.method} ${message}`);
    next();
  };
}

function randomTrueFalse(request, response, next) {
  request.valid = Boolean(Math.round(Math.random()));
  next();
}

//error handlers
const firstErrorHandler = (status) => (request, response) => response.status(404).send('Error found');
const secondErrorHandler = (status) => (request, response) => response.status(500).send('Error found');

// Route to Get All Categories
app.get('/categories', randomTrueFalse, logger('this is the get route'), (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
  console.log(req.valid);
});

// Route to Create a Category
app.post('/categories', randomTrueFalse, logger('this is the post route'), (req, res, next) => {
  let record = req.body;
  record.id = Math.random();
  db.push(record);
  res.json(record);
});

app.use(secondErrorHandler(404));
app.use(firstErrorHandler(404));

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  },
};