'use strict';

const express = require('express');

const app = express();

let db = [];

app.use(express.json());
app.use(requestTime);

// middleware
function requestTime (request, response, next) {
  request.requestTime = Date.now();
  next();
}

// Route to Get All Categories
app.get('/categories', (req, res, next) => {
  let count = db.length;
  let results = db;
  console.log(`${req.requestTime} ${req.path} ${req.method}`);
  res.json({ count, results });
});

// Route to Create a Category
app.post('/categories', (req, res, next) => {
  let record = req.body;
  record.id = Math.random();
  db.push(record);
  res.json(record);
});

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  },
};