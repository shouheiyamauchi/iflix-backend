const app = require('../../../index');
const request = require('supertest');
const should = require('should');
const mongoose = require('mongoose');

const AllRating = require(__modelsDir + '/AllRating');
const IndividualRating = require(__modelsDir + '/IndividualRating');
const Content = require(__modelsDir + '/Content');

const ratingsApiEndPoint = 'http://localhost:' + process.env.TEST_PORT + '/api/v1/ratings';

describe('- api/v1/ratings', () => {
  // non-fat arrow functions required in areas where values 'this.currentTest.individualRating'
  // and 'this.test.individualRating' are shared to get the correct scopes
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

          const individualRating = new IndividualRating();

          individualRating.contentId = content._id;
          individualRating.userId = mongoose.Types.ObjectId();
          individualRating.stars = 5;

          individualRating.save((err, individualRating) => {
            // can be accessed inside 'it' scope as this.test.individualRating
            this.currentTest.individualRating = individualRating;

            const allRating = new AllRating();

            allRating.contentId = individualRating.contentId;
            allRating.fiveStarsCount++;
            allRating.totalStarsCount++;
            allRating.average = individualRating.stars;

            allRating.save((err, allRating) => {
              done();
            });
          });
        });
      });
  });

  after(done => {
    mongoose.connection.dropDatabase()
      .then(() => {
        done();
      });
  });

  describe('1. Ratings Show (GET /:id)', () => {
    describe('1.1 Successful requests', () => {
      it('should be a successful status 200 API call', function(done) {
        request(ratingsApiEndPoint)
          .get('/' + this.test.individualRating.contentId)
          .end(function(err, res) {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should have an average rating of 5', function(done) {
        request(ratingsApiEndPoint)
          .get('/' + this.test.individualRating.contentId)
          .end(function(err, res) {
            res.should.have.property('status', 200);
            const allRating = res.body.data;
            allRating.should.be.an.instanceOf(Object).and.have.property('average', 5);
            done();
          });
      });

      it('should have only one count of five stars', function(done) {
        request(ratingsApiEndPoint)
          .get('/' + this.test.individualRating.contentId)
          .end(function(err, res) {
            res.should.have.property('status', 200);
            const allRating = res.body.data;
            allRating.should.be.an.instanceOf(Object).and.have.property('oneStarCount', 0);
            allRating.should.be.an.instanceOf(Object).and.have.property('twoStarsCount', 0);
            allRating.should.be.an.instanceOf(Object).and.have.property('threeStarsCount', 0);
            allRating.should.be.an.instanceOf(Object).and.have.property('fourStarsCount', 0);
            allRating.should.be.an.instanceOf(Object).and.have.property('fiveStarsCount', 1);
            done();
          });
      });

      it('should have only one count of total stars', function(done) {
        request(ratingsApiEndPoint)
          .get('/' + this.test.individualRating.contentId)
          .end(function(err, res) {
            res.should.have.property('status', 200);
            const allRating = res.body.data;
            allRating.should.be.an.instanceOf(Object).and.have.property('totalStarsCount', 1);
            done();
          });
      });
    });

    describe('1.2 Unsuccessful requests', () => {
      it('should give an error with status 404 for non existent content', function(done) {
        // generate random mongoose ID
        let randomId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomId ending up to be the same
        while (this.test.individualRating.contentId == randomId) {
          randomId = mongoose.Types.ObjectId();
        };

        request(ratingsApiEndPoint)
          .get('/' + randomId)
          .end((err, res) => {
            res.should.have.property('status', 404);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('notFound');
            done();
          });
      });

      it('should give an error with status 500 for invalid id format', done => {
        request(ratingsApiEndPoint)
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

  describe('2. Ratings Create (POST /)', () => {
    describe('2.1 Successful requests', () => {
      it('should be a successful status 200 API call', function(done) {
        // generate random mongoose ID
        let randomUserId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomUserId ending up to be the same
        while (this.test.individualRating.userId == randomUserId) {
          randomUserId = mongoose.Types.ObjectId();
        };

        request(ratingsApiEndPoint)
          .post('?contentId=' + this.test.individualRating.contentId + '&userId=' + randomUserId + '&stars=3')
          .end(function(err, res) {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should have correct average rating on first create', function(done) {
        const content = new Content();
        content.title = "Superman";
        content.genre = "Action";
        content.releaseDate = Date.parse('12-21-1978');

        content.save((err, content) => {
          request(ratingsApiEndPoint)
            .post('?contentId=' + content._id + '&userId=' + this.test.individualRating.userId + '&stars=3')
            .end(function(err, res) {
              res.should.have.property('status', 200);
              const allRating = res.body.data;
              // 2 ratings of 3 & 5 results in average of 4
              allRating.should.be.an.instanceOf(Object).and.have.property('average', 3);
              done();
            });
        });
      });

      it('should have an average rating of 4', function(done) {
        // generate random mongoose ID
        let randomUserId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomUserId ending up to be the same
        while (this.test.individualRating.userId == randomUserId) {
          randomUserId = mongoose.Types.ObjectId();
        };

        request(ratingsApiEndPoint)
          .post('?contentId=' + this.test.individualRating.contentId + '&userId=' + randomUserId + '&stars=3')
          .end(function(err, res) {
            res.should.have.property('status', 200);
            const allRating = res.body.data;
            // 2 ratings of 3 & 5 results in average of 4
            allRating.should.be.an.instanceOf(Object).and.have.property('average', 4);
            done();
          });
      });

      it('should have one count for each of three and five stars', function(done) {
        // generate random mongoose ID
        let randomUserId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomUserId ending up to be the same
        while (this.test.individualRating.userId == randomUserId) {
          randomUserId = mongoose.Types.ObjectId();
        };

        request(ratingsApiEndPoint)
          .post('?contentId=' + this.test.individualRating.contentId + '&userId=' + randomUserId + '&stars=3')
          .end(function(err, res) {
            res.should.have.property('status', 200);
            const allRating = res.body.data;
            allRating.should.be.an.instanceOf(Object).and.have.property('oneStarCount', 0);
            allRating.should.be.an.instanceOf(Object).and.have.property('twoStarsCount', 0);
            allRating.should.be.an.instanceOf(Object).and.have.property('threeStarsCount', 1);
            allRating.should.be.an.instanceOf(Object).and.have.property('fourStarsCount', 0);
            allRating.should.be.an.instanceOf(Object).and.have.property('fiveStarsCount', 1);
            done();
          });
      });

      it('should have two counts of total stars', function(done) {
        // generate random mongoose ID
        let randomUserId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomUserId ending up to be the same
        while (this.test.individualRating.userId == randomUserId) {
          randomUserId = mongoose.Types.ObjectId();
        };

        request(ratingsApiEndPoint)
          .post('?contentId=' + this.test.individualRating.contentId + '&userId=' + randomUserId + '&stars=3')
          .end(function(err, res) {
            res.should.have.property('status', 200);
            const allRating = res.body.data;
            allRating.should.be.an.instanceOf(Object).and.have.property('totalStarsCount', 2);
            done();
          });
      });
    });

    describe('2.2 Unsuccessful requests', () => {
      it('should give an error with status 500 for invalid userId format', function(done) {
        request(ratingsApiEndPoint)
          .post('?contentId=' + this.test.individualRating.contentId + '&userId=' + '111' + '&stars=3')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            errors.validationErrors.should.be.an.instanceOf(Object).and.have.property('userId');
            done();
          });
      });

      it('should give an error with status 500 for invalid contentId format', function(done) {
        // generate random mongoose ID
        let randomUserId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomUserId ending up to be the same
        while (this.test.individualRating.userId == randomUserId) {
          randomUserId = mongoose.Types.ObjectId();
        };

        request(ratingsApiEndPoint)
          .post('?contentId=' + '111' + '&userId=' + randomUserId + '&stars=3')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('objectId');
            done();
          });
      });

      it('should give an error with status 404 for non existent contentId', function(done) {
        // generate random mongoose ID
        let contentUserId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of contentUserId ending up to be the same
        while (this.test.individualRating.contentId == contentUserId) {
          contentUserId = mongoose.Types.ObjectId();
        };

        request(ratingsApiEndPoint)
          .post('?contentId=' + contentUserId + '&userId=' + this.test.individualRating.userId + '&stars=3')
          .end((err, res) => {
            res.should.have.property('status', 404);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('notFound');
            done();
          });
      });

      it('should give an error with status 500 for missing stars', function(done) {
        // generate random mongoose ID
        let randomUserId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomUserId ending up to be the same
        while (this.test.individualRating.userId == randomUserId) {
          randomUserId = mongoose.Types.ObjectId();
        };

        request(ratingsApiEndPoint)
          .post('?contentId=' + this.test.individualRating.contentId + '&userId=' + randomUserId)
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            errors.validationErrors.should.be.an.instanceOf(Object).and.have.property('stars');
            done();
          });
      });

      it('should give an error with status 500 for stars outside range of 1 - 5', function(done) {
        // generate random mongoose ID
        let randomUserId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomUserId ending up to be the same
        while (this.test.individualRating.userId == randomUserId) {
          randomUserId = mongoose.Types.ObjectId();
        };

        request(ratingsApiEndPoint)
          .post('?contentId=' + this.test.individualRating.contentId + '&userId=' + randomUserId + '&stars=6')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            errors.validationErrors.should.be.an.instanceOf(Object).and.have.property('stars');
            done();
          });
      });
    });
  });
});
