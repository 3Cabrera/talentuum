var express = require('express');
var path = require('path');
const mongoose = require("mongoose");
require("dotenv").config();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var erase = require('./routes/erase');
var trades = require('./routes/trades');
var stocks = require('./routes/stocks');

//app - express
const app = express();


// db
const db = async () => {
    try {
    const success = await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: true,
        family: 4,
        useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Error", error);
  }
};
db();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server... runing on on url: http://localhost:${port}/`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('', trades);
app.use('', index);
app.use('', erase);
app.use('', stocks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
