var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    buzzwordArr = require('./../model/buzzwordContents.js'),
    score = require('./../model/score.js'),
    validations = require('./../middleware/validations.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.route('/reset').post(validations(['reset']), function (req, res) {

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
});

router.route('/buzzwords').get(function (req, res) {
  
     return res.json({
      buzzWords: buzzwordArr
    })
  })

module.exports = router;