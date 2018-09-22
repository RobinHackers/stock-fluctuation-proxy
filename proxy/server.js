const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
var proxy = require('express-http-proxy');

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/:company', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', proxy('localhost:3001'));
app.use('/api/data/company', proxy('localhost:3002'));
app.use('/api/people-also-bought', proxy('localhost:3003'));
app.use('/api/stocks/sideBar', proxy('localhost:3004'));

app.listen(PORT, err =>
  console.log(
    err ||
      `Server now running on port ${PORT}, have a great experience  👨🏽‍💻  🚀  🐺`
  )
);
