const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
var proxy = require('express-http-proxy');

const PORT = process.env.PORT || 3000;

// Allow cross origin requests
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/:company', express.static(path.join(__dirname, 'public')));
app.use('/api', proxy('localhost:3001'));
app.use('/data/company', proxy('localhost:3002'));
app.use('/people-also-bought', proxy('localhost:3003'));
app.use('/stocks/sideBar', proxy('localhost:3004'));

app.listen(PORT, err =>
  console.log(
    err ||
      `Server now running on port ${PORT}, have a great experience  👨🏽‍💻  🚀  🐺`
  )
);
