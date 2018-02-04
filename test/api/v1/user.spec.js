const app = require('../../../index');
const request = require('supertest');
const should = require('should');
const mongoose = require('mongoose');

const User = require(__modelsDir + '/User');

const usersApiEndPoint = 'http://localhost:' + process.env.TEST_PORT + '/api/v1/users/';

describe('- api/v1/user', () => {
  // non-fat arrow functions required in areas where values 'this.currentTest.value'
  // and 'this.test.value' are shared to get the correct scopes
  beforeEach(function(done) {
    mongoose.connection.dropDatabase()
      .then(() => {
        const user = new User();
        user.username = "iflix-user";
        user.password = "password123";

        user.save((err, user) => {
          // can be accessed inside 'it' scope as this.test.value
          this.currentTest.value = user;
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

  describe('1. Users Show (GET /:id)', () => {
    describe('1.1 Successful requests', () => {
      it('should be a successful status 200 API call', function(done) {
        request(usersApiEndPoint)
          .get('/' + this.test.value._id)
          .end((err, res) => {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should be the same user', function(done) {
        request(usersApiEndPoint)
          .get('/' + this.test.value._id)
          .end((err, res) => {
            res.should.have.property('status', 200);
            const user = res.body.data;
            user.should.be.an.instanceOf(Object).and.have.property('username', 'iflix-user');
            user.should.be.an.instanceOf(Object).and.have.property('password', 'password123');
            done();
          });
      });
    });

    describe('1.2 Unsuccessful requests', () => {
      it('should give an error with status 404 for non existent user', function(done) {
        // generate random mongoose ID
        let randomId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomId ending up to be the same
        while (this.test.value._id == randomId) {
          randomId = mongoose.Types.ObjectId();
        };

        request(usersApiEndPoint)
          .get('/' + randomId)
          .end((err, res) => {
            res.should.have.property('status', 404);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('notFound');
            done();
          });
      });

      it('should give an error with status 500 for invalid id format', done => {
        request(usersApiEndPoint)
          .get('/' + '111')
          .expect(200)
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('objectId');
            done();
          });
      });
    });
  });

  describe('2. Users Create (POST /)', () => {
    describe('2.1 Successful requests', () => {
      it('should be a successful status 200 API call', done => {
        request(usersApiEndPoint)
          .post('?username=movie-lover&password=safepassword')
          .end((err, res) => {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should return the same user as posted', done => {
        request(usersApiEndPoint)
          .post('?username=movie-lover&password=safepassword')
          .end((err, res) => {
            res.should.have.property('status', 200);
            const user = res.body.data;
            user.should.be.an.instanceOf(Object).and.have.property('username', 'movie-lover');
            user.should.be.an.instanceOf(Object).and.have.property('password', 'safepassword');
            done();
          });
      });
    });

    describe('2.2 Unsuccessful requests', () => {
      it('should give an error with status 500 for missing username', done => {
        request(usersApiEndPoint)
          .post('?password=safepassword')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });

      it('should give an error with status 500 for missing password', done => {
        request(usersApiEndPoint)
          .post('?username=movie-lover')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });
    });
  });
});
