const request = require('supertest');
const should = require('should');
const mongoose = require('mongoose');
const app = require('../../../index');

const Content = require(__rootDir + 'api/v1/content/contentModel');

const contentsApiEndPoint = 'http://localhost:' + process.env.TEST_PORT + '/api/v1/contents/';

// non-fat arrow functions required in areas where values 'this.currentTest.value'
// and 'this.test.value' are shared to get the correct scopes
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
      request(contentsApiEndPoint)
        .get('/')
        .expect(200)
        .end(function(err, res) {
          done();
        });
    });

    it('should have one result', done => {
      request(contentsApiEndPoint)
        .get('/')
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
      request(contentsApiEndPoint)
        .get('/' + this.test.value._id)
        .end((err, res) => {
          res.should.have.property('status', 200);
          done();
        });
    });

    it('should be the same content', function(done) {
      request(contentsApiEndPoint)
        .get('/' + this.test.value._id)
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

      request(contentsApiEndPoint)
        .get('/' + randomId)
        .end((err, res) => {
          res.should.have.property('status', 404);
          done();
        });
    });

    it('should give a 500 error for invalid id format', done => {
      request(contentsApiEndPoint)
        .get('/' + '111')
        .expect(200)
        .end((err, res) => {
          res.should.have.property('status', 500);
          done();
        });
    });
  });
});

describe('3. Contents Create (POST /)', () => {
  describe('3.1 Successful requests', () => {
    it('should be a successful API call', done => {
      request(contentsApiEndPoint)
        .post('?title=Star%20Wars&genre=Sci-fi&releaseDate=12-14-2017')
        .end((err, res) => {
          res.should.have.property('status', 200);
          done();
        });
    });

    it('should return the same content as posted', done => {
      request(contentsApiEndPoint)
        .post('?title=Star%20Wars&genre=Sci-fi&releaseDate=12-14-2017')
        .end((err, res) => {
          res.should.have.property('status', 200);
          const content = res.body.data;
          content.should.be.an.instanceOf(Object).and.have.property('title', 'Star Wars');
          content.should.be.an.instanceOf(Object).and.have.property('genre', 'Sci-fi');
          done();
        });
    });
  });

  describe('3.2 Unsuccessful requests', () => {
    it('should give a 500 error for missing title', done => {
      request(contentsApiEndPoint)
        .post('?genre=Sci-fi&releaseDate=12-14-2017')
        .end((err, res) => {
          res.should.have.property('status', 500);
          done();
        });
    });

    it('should give a 500 error for missing genre', done => {
      request(contentsApiEndPoint)
        .post('?title=Star%20Wars&releaseDate=12-14-2017')
        .end((err, res) => {
          res.should.have.property('status', 500);
          done();
        });
    });

    it('should give a 500 error for missing release date', done => {
      request(contentsApiEndPoint)
        .post('?title=Star%20Wars&genre=Sci-fi')
        .end((err, res) => {
          res.should.have.property('status', 500);
          done();
        });
    });

    it('should give a 500 error for invalid release date format', done => {
      request(contentsApiEndPoint)
        .post('?title=Star%20Wars&releaseDate=14-00-2017')
        .end((err, res) => {
          res.should.have.property('status', 500);
          done();
        });
    });
  });
});
