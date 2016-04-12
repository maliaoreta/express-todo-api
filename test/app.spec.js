var request = require('supertest');
var app = require("../app.js");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : true }));

describe('GET /buzzwords', function () {

  it('should respond with json', function (done) {

    request(app)
      .get('/buzzwords')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});

describe('POST /buzzword', function () {

  it('should post a new buzzword', function (done) {

    request(app)
      .post('/buzzword')
      .send({ buzzWord: 'Hello', points: 100 })
      .expect(200, done);
  });
});

describe('PUT /buzzword', function () {

  it('should change a buzzwords heard property to true', function (done) {

    request(app)
      .put('/buzzword')
      .send({ buzzWord: 'Hello', heard: true })
      .expect(200, done);
  });
});