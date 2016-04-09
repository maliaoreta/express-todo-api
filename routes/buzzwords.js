var express = require('express'),
    buzzwordContent = require('./buzzwordContents.js'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    score = require('./score.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));



router.route('/')
  .post(function (req, res) {

    if (buzzwordContent.length === 5) {

      res.send('Sorry! Only 5 words allowed!')
      return;
    }

    var reqBody = req.body;
    var buzzWordObj = {
      buzzWord : reqBody.buzzWord,
      score: reqBody.points,
      heard: false
    }

    buzzwordContent.push(buzzWordObj);

    return res.json({
      success: true
    });
  })
  .put(function (req, res) {

    var reqBody = req.body;

    buzzwordContent.forEach(function (obj) {

      if (obj.buzzWord === reqBody.buzzWord) {

        if (obj.heard === false) {
          obj.heard = true;
          score += Number(obj.score);

          return res.json({
            success: true,
            newScore: score
          });
        }
        else {
          return res.send('You\'ve already heard that word!');
        }
      }
    })

  })
  .delete(function (req, res) {

    var reqBody = req.body;
    var buzzIndex;

    buzzwordContent.forEach(function (obj) {

      if (obj.buzzWord === reqBody.buzzWord) {

        buzzIndex = buzzwordContent.indexOf(obj);
      }
    })

    buzzwordContent.splice(buzzIndex, 1);
    
    return res.json({
      success: true
    });
  });
  
module.exports = router;