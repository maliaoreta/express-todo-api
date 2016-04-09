var express = require('express'),
    buzzwordContent = require('./buzzwordContents.js'),
    router = express.Router(),
    bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var score = 0;

router.route('/')
  .post(function (req, res) {

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

        obj.heard = true;
        score += Number(obj.score);

      }
    })

    return res.json({
      success: true,
      newScore: score
    });
  })
  .delete(function (req, res) {

    var reqBody = req.body;
    var buzzIndex;
    console.log('reqBody', reqBody);

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