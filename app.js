var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    score = require('./routes/score.js'),
    buzzwordArr = require('./routes/buzzwordContents');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// /buzzword route
var buzzwordsRoute = require('./routes/buzzwords');

app.use(express.static('public'));

app.get('/buzzwords', function (req, res) {
  
   return res.json({
    buzzWords: buzzwordArr
  })
})
.post('/reset', function (req, res) {

  score = 0;
  buzzwordArr.splice(0);
  return res.json({
    success: true
  })
})
.use('/buzzword', buzzwordsRoute);

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening on 8080');
});