var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
var buzzwordsRoute = require('./routes/buzzwords');
var buzzwordContent = require('./routes/buzzwordContents');

app.use(express.static('public'));

app.get('/buzzwords', function (req, res) {
  
   res.json({
    buzzWords: buzzwordContent
  })
})

app.post('/reset', function (req, res) {

  // NEEDS TO RESET EVERYTHING ON DELETE
})

app.use('/buzzword', buzzwordsRoute);


var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening on 8080');
})