const app = require('../../../index');
const request = require('supertest');
const should = require('should');
const mongoose = require('mongoose');

const Content = require(__modelsDir + '/Content');

const contentsApiEndPoint = 'http://localhost:' + process.env.TEST_PORT + '/api/v1/contents';

describe('- api/v1/contents', () => {
  // non-fat arrow functions required in areas where values 'this.currentTest.content'
  // and 'this.test.content' are shared to get the correct scopes
  beforeEach(function(done) {
    mongoose.connection.dropDatabase()
      .then(() => {
        const content = new Content();
        content.title = "Superman";
        content.genre = "Action";
        content.releaseDate = Date.parse('12-21-1978');

        content.save((err, content) => {
          // can be accessed inside 'it' scope as this.test.content
          this.currentTest.content = content;
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
      it('should be a successful status 200 API call', done => {
        request(contentsApiEndPoint)
          .get('?pageNo=1&resultsPerPage=10')
          .end(function(err, res) {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should have one result', done => {
        request(contentsApiEndPoint)
          .get('?pageNo=1&resultsPerPage=10')
          .end(function(err, res) {
            res.should.have.property('status', 200);
            const contentsArray = res.body.data.docs;
            contentsArray.should.be.instanceof(Array).and.have.lengthOf(1);
            done();
          });
      });
    });

    describe('1.2 Unsuccessful requests', () => {
      it('should give an error with status 500 for missing pageNo', done => {
        request(contentsApiEndPoint)
          .get('?resultsPerPage=10')
          .end(function(err, res) {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('pageNoMissing');
            done();
          });
      });

      it('should give an error with status 500 for missing resultsPerPage', done => {
        request(contentsApiEndPoint)
          .get('?pageNo=1')
          .end(function(err, res) {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('resultsPerPageMissing');
            done();
          });
      });
    });
  });

  describe('2. Contents Show (GET /:id)', () => {
    describe('2.1 Successful requests', () => {
      it('should be a successful status 200 API call', function(done) {
        request(contentsApiEndPoint)
          .get('/' + this.test.content._id)
          .end((err, res) => {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should be the same content', function(done) {
        request(contentsApiEndPoint)
          .get('/' + this.test.content._id)
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
      it('should give an error with status 404 for non existent content', function(done) {
        // generate random mongoose ID
        let randomId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomId ending up to be the same
        while (this.test.content._id == randomId) {
          randomId = mongoose.Types.ObjectId();
        };

        request(contentsApiEndPoint)
          .get('/' + randomId)
          .end((err, res) => {
            res.should.have.property('status', 404);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('notFound');
            done();
          });
      });

      it('should give an error with status 500 for invalid id format', done => {
        request(contentsApiEndPoint)
          .get('/' + '111')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('objectId');
            done();
          });
      });
    });
  });

  describe('3. Contents Create (POST /)', () => {
    describe('3.1 Successful requests', () => {
      it('should be a successful status 200 API call', done => {
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
      it('should give an error with status 500 for missing title', done => {
        request(contentsApiEndPoint)
          .post('?genre=Sci-fi&releaseDate=12-14-2017')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });

      it('should give an error with status 500 for missing genre', done => {
        request(contentsApiEndPoint)
          .post('?title=Star%20Wars&releaseDate=12-14-2017')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });

      it('should give an error with status 500 for missing release date', done => {
        request(contentsApiEndPoint)
          .post('?title=Star%20Wars&genre=Sci-fi')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });

      it('should give an error with status 500 for invalid release date format', done => {
        request(contentsApiEndPoint)
          .post('?title=Star%20Wars&releaseDate=14-00-2017')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });
    });
  });

  describe('4. Contents Update (PUT /:id)', () => {
    describe('4.1 Successful requests', () => {
      it('should be a successful status 200 API call', function(done) {
        request(contentsApiEndPoint)
          .put('/' + this.test.content._id + '?title=Star%20Wars&genre=Sci-fi&releaseDate=12-14-2017')
          .end((err, res) => {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should return the updated content', function(done) {
        request(contentsApiEndPoint)
          .put('/' + this.test.content._id + '?title=Star%20Wars&genre=Sci-fi&releaseDate=12-14-2017')
          .end((err, res) => {
            res.should.have.property('status', 200);
            const content = res.body.data;
            content.should.be.an.instanceOf(Object).and.have.property('title', 'Star Wars');
            content.should.be.an.instanceOf(Object).and.have.property('genre', 'Sci-fi');
            done();
          });
      });
    });

    describe('4.2 Unsuccessful requests', () => {
      it('should give an error with status 404 for non existent content', function(done) {
        // generate random mongoose ID
        let randomId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomId ending up to be the same
        while (this.test.content._id == randomId) {
          randomId = mongoose.Types.ObjectId();
        };

        request(contentsApiEndPoint)
          .put('/' + randomId + '?title=Star%20Wars&genre=Sci-fi&releaseDate=12-14-2017')
          .end((err, res) => {
            res.should.have.property('status', 404);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('notFound');
            done();
          });
      });

      it('should give an error with status 500 for missing title', function(done) {
        request(contentsApiEndPoint)
          .put('/' + this.test.content._id + '?genre=Sci-fi&releaseDate=12-14-2017')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });

      it('should give an error with status 500 for missing genre', function(done) {
        request(contentsApiEndPoint)
          .put('/' + this.test.content._id + '?title=Star%20Wars&releaseDate=12-14-2017')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });

      it('should give an error with status 500 for missing release date', function(done) {
        request(contentsApiEndPoint)
          .put('/' + this.test.content._id + '?title=Star%20Wars&genre=Sci-fi')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });

      it('should give an error with status 500 for invalid release date format', function(done) {
        request(contentsApiEndPoint)
          .put('/' + this.test.content._id + '?title=Star%20Wars&releaseDate=14-00-2017')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });
    });
  });

  describe('5. Contents Destroy (DELETE /:id)', () => {
    describe('5.1 Successful requests', () => {
      it('should be a successful status 200 API call', function(done) {
        request(contentsApiEndPoint)
          .delete('/' + this.test.content._id)
          .end((err, res) => {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should remove the content successfully', function(done) {
        request(contentsApiEndPoint)
          .delete('/' + this.test.content._id)
          .end((err, res) => {
            res.should.have.property('status', 200);
            Content.find({}, (mongoErrors, contents) => {
              contents.should.be.instanceof(Array).and.have.lengthOf(0);
              done();
            });
          });
      });
    });

    describe('5.2 Unsuccessful requests', () => {
      it('should give an error with status 404 for non existent content', function(done) {
        // generate random mongoose ID
        let randomId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomId ending up to be the same
        while (this.test.content._id == randomId) {
          randomId = mongoose.Types.ObjectId();
        };

        request(contentsApiEndPoint)
          .delete('/' + randomId)
          .end((err, res) => {
            res.should.have.property('status', 404);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('notFound');
            done();
          });
      });

      it('should give an error with status 500 for invalid id format', function(done) {
        request(contentsApiEndPoint)
          .delete('/' + '111')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('objectId');
            done();
          });
      });
    });
  });
});
