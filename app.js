var express = require('express');
var app = express();
var article = require('./routes/article');
var page = require('./routes/page');
var taco = require('./routes/taco');
var user = require('./routes/user');

var server = app.listen(2000, function() {
  console.log('Listening on port 2000');
  console.log('Open htt://localhost:2000 on browser');
});

app.use(require('./routes/index'));
app.get('/article', article.getData);
app.get('/page', page.getData);
app.get('/taco', taco.getData);
app.get('/user', user.getData);
