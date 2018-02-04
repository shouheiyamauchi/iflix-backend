const app = require('../../../index');
const request = require('supertest');
const should = require('should');
const mongoose = require('mongoose');

const AllRating = require(__modelsDir + '/AllRating');
const IndividualRating = require(__modelsDir + '/IndividualRating');

const ratingsApiEndPoint = 'http://localhost:' + process.env.TEST_PORT + '/api/v1/ratings/';

describe('- api/v1/ratings', () => {
  // non-fat arrow functions required in areas where values 'this.currentTest.individualRating'
  // and 'this.test.individualRating' are shared to get the correct scopes
  beforeEach(function(done) {
    mongoose.connection.dropDatabase()
      .then(() => {
        const individualRating = new IndividualRating();

        individualRating.contentId = mongoose.Types.ObjectId();
        individualRating.userId = mongoose.Types.ObjectId();
        individualRating.stars = 5;

        // can be accessed inside 'it' scope as this.test.individualRating
        this.currentTest.individualRating = individualRating;

        individualRating.save((err, individualRating) => {
          const allRating = new AllRating();

          allRating.contentId = individualRating.contentId;
          allRating.fiveStarsCount++;
          allRating.totalStarsCount++;

          allRating.save((err, allRating) => {
            done();
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
          .expect(200)
          .end(function(err, res) {
            done();
          });
      });
    });
  });
});
