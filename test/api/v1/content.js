const request = require('supertest');
const should = require('should');
const mongoose = require('mongoose');
const app = require('../../../index');

const Content = require(__rootDir + 'api/v1/content/contentModel');

const apiEndPoint = 'http://localhost:' + process.env.TEST_PORT + '/';

beforeEach(function(done) {
  mongoose.connection.dropDatabase()
    .then(() => {
      const content = new Content();
      content.title = "Superman";
      content.genre = "Action";
      content.releaseDate = Date.parse('12-21-1978');
      content.updated = Date.now();

      content.save((err, content) => {
        // can be accessed inside 'it' scope as this.test.value
        this.currentTest.value = content;
        done();
      });
    });
});

after(done => {
  mongoose.connection.dropDatabase()
    .then(() => {
      done();
    });
});

describe('1. Contents Index (GET /)', () => {
  describe('1.1 Successful requests', () => {
    it('should be a successful API call', done => {
      request(apiEndPoint)
        .get('api/v1/contents')
        .expect(200)
        .end(function(err, res) {
          done();
        });
    });

    it('should have one result', done => {
      request(apiEndPoint)
        .get('api/v1/contents')
        .expect(200)
        .end(function(err, res) {
          const contentsArray = res.body.data;
          contentsArray.should.be.instanceof(Array).and.have.lengthOf(1);
          done();
        });
    });
  });
});

describe('2. Contents Show (GET /:id)', () => {
  describe('2.1 Successful requests', () => {
    it('should be a successful API call', function(done) {
      request(apiEndPoint)
        .get('api/v1/contents/' + this.test.value._id)
        .end((err, res) => {
          res.should.have.property('status', 200);
          done();
        });
    });

    it('should be the same content', function(done) {
      request(apiEndPoint)
        .get('api/v1/contents/' + this.test.value._id)
        .end((err, res) => {
          res.should.have.property('status', 200);
          const content = res.body.data;
          content.should.be.an.instanceOf(Object).and.have.property('title', 'Superman');
          content.should.be.an.instanceOf(Object).and.have.property('genre', 'Action');
          done();
        });
    });
  });

  describe('2.2 Unsuccessful requests', () => {
    it('should give a 404 error for non existent content', function(done) {
      // generate random mongoose ID
      let randomId = mongoose.Types.ObjectId();

      // account for very unlikely edge case of randomId ending up to be the same
      while (this.test.value._id == randomId) {
        randomId = mongoose.Types.ObjectId();
      };

      request(apiEndPoint)
        .get('api/v1/contents/' + randomId)
        .end((err, res) => {
          res.should.have.property('status', 404);
          done();
        });
    });

    it('should give a 500 error for invalid id format', function(done) {
      request(apiEndPoint)
        .get('api/v1/contents/' + '111')
        .expect(200)
        .end((err, res) => {
          res.should.have.property('status', 500);
          done();
        });
    });
  });
});
