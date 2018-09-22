const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const sideBar = require('./router/sideBar');
const db = require('../db/db.js');
const logger = require('morgan');
const app = express();
const PORT = 3004;
app.use(parser.json());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect(
  'mongodb://localhost/fecdata',
  { useNewUrlParser: true },
  err => {
    console.log(err || 'mongoDB connected!');
  }
);

app.get('/:company', (req, res) => {
  console.log('hit');
  const companyName = req.params.company;
  db.find({ companyName }, null, (err, result) => {
    if (err) {
      return console.log('callback error');
    }
    console.log(req.params);
    return res.json(result);
  });
});

app.use('/stocks/sideBar', sideBar);

app.listen(PORT, () => {
  console.log('Listening to port: ', PORT);
});
