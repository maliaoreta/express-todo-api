var express = require('express'),
    buzzwordArr = require('./buzzwordContents.js'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    score = require('./score.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.route('/')
  .post(function (req, res) {

    if (buzzwordArr.length === 5) {

      return res.status(400).send('Sorry! Only 5 words allowed!')
    }

    var reqBody = req.body;
    var buzzWordObj = {
      buzzWord : reqBody.buzzWord,
      score: reqBody.points,
      heard: false
    }

    buzzwordArr.push(buzzWordObj);

    return res.json({
      success: true
    });
  })
  .put(function (req, res) {

    var reqBody = req.body;
    if (buzzwordArr.length === 0) {
      return res.status(400).send('There are no buzzwords to be heard!');
    }

    for (var i = 0; i<buzzwordArr.length; i++) {

      if (buzzwordArr[i].buzzWord === reqBody.buzzWord) {

        buzzwordArr[i].heard = reqBody.heard;
        score += Number(buzzwordArr[i].score);
        return res.json({
          success: true,
          newScore: score
        })
      }
    }

    return res.status(400).send('That buzzword doesn\'t exist!');
  })
  .delete(function (req, res) {

    var reqBody = req.body;
    var buzzIndex;

    if (buzzwordArr.length === 0) {

      return res.status(400).send('There are no buzzwords to be heard!');
    }

    for (var k = 0; k < buzzwordArr.length; k++) {

      if (buzzwordArr[k].buzzWord === reqBody.buzzWord) {

        buzzwordArr.splice(k, 1);
        
        return res.json({
          success: true
        });
      }
    }

    return res.status(400).send('That buzzword doesn\'t exist!');
  });
  
module.exports = router;