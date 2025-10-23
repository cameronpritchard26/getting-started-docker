var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var os = require("os");
var morgan  = require('morgan');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('static'));
app.use(morgan('combined'));

var port = process.env.PORT || 8080;
var message = process.env.MESSAGE || "Have a blast learning Docker!";
var dt = new Date();
var currentDateTime = `${
  (dt.getMonth()+1).toString().padStart(2, '0')}/${
  dt.getDate().toString().padStart(2, '0')}/${
  dt.getFullYear().toString().padStart(4, '0')} ${
  dt.getHours().toString().padStart(2, '0')}:${
  dt.getMinutes().toString().padStart(2, '0')}:${
  dt.getSeconds().toString().padStart(2, '0')}`

app.get('/', function (req, res) {
    res.render('home', {
      message: message,
      hostName: os.hostname(),
      version: "2021.03.30.a",
      currentTimestamp: currentDateTime
    });
});

app.listen(port, function () {
  console.log("Listening on: http://%s:%s", os.hostname(), port);
});