const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../index');

const Content = require(__rootDir + 'api/v1/content/contentModel');

const apiEndPoint = 'http://localhost:' + process.env.TEST_PORT + '/';

before((done) => {
  mongoose.connection.dropDatabase()
    .then(() => {
      done()
    })

  // const content = new Content();
  // content.title = "Test";
  // content.genre = "Genre";
  // content.releaseDate = Date.now();
  // content.thumbnail = "http://google.com";
  // content.updated = Date.now();
  //
  // content.save()
});

after((done) => {
  mongoose.connection.dropDatabase()
    .then(() => {
      done()
    })
})

describe('List contents', function() {
  it('should be a successful API call', function(done) {
    request(apiEndPoint)
      .get('api/v1/contents')
      .expect(200)
      .end(function(err, res){
        // console.log(res.body)
      done();
    });
  });
});
