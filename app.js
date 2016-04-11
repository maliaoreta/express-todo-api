var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    score = require('./routes/score.js'),
    buzzwordArr = require('./routes/buzzwordContents'),
    validations = require('./routes/validations.js');

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
.post('/reset', validations(['reset']), function (req, res) {

    if (req.body.reset === 'true') {

      score = 0;
      buzzwordArr.splice(0);
      return res.json({
        success: true
      })
    }
    else {
      return res.send('To reset the buzzword collection, set "reset" to true!');
    }
  }
)
.use('/buzzword', buzzwordsRoute);

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening on 8080');
});