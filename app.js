var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    score = require('./model/score.js'),
    buzzwordArr = require('./model/buzzwordContents.js'),
    validations = require('./middleware/validations.js'),
    buzzwordsRoute = require('./routes/buzzwords'),
    rootRoute = require('./routes/rootRoute.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static('public'))
  .use('/', rootRoute)
  .use('/buzzword', buzzwordsRoute);

if(!module.parent){

  var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening on 8080');
  });
}

module.exports = app;