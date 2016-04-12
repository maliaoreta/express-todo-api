function validations (validFields) {

  return function (req, res, next) {

    var missingKeys = validFields.filter((key) => {

      return !req.body.hasOwnProperty(key) || req.body[key].length === 0;
    })

    if (missingKeys.length !== 0) {

      return res.sendStatus(400);
    }

    else if (req.body.hasOwnProperty('buzzWord')) {

      if (!isNaN(req.body.buzzWord)) {

        return res.status(400).send('The "buzzWord" value should be a string!');
      }
    }

    else if (req.body.hasOwnProperty('points')) {

      if (isNaN(req.body.points)) {

        return res.status(400).send('The "points" value must be a number!');
      }
    }

    else if (req.body.hasOwnProperty('heard')) {

      if (req.body.heard !== 'true' && req.body.heard !== 'false') {

        return res.status(400).send('The "heard" value must be either true/false!');
      }
    }

    return next();
  }
}

module.exports = validations;