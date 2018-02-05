const app = require('../../../index');
const request = require('supertest');
const should = require('should');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require(__modelsDir + '/User');

const usersApiEndPoint = 'http://localhost:' + process.env.TEST_PORT + '/api/v1/users';

describe('- api/v1/users', () => {
  // non-fat arrow functions required in areas where values 'this.currentTest.user'
  // and 'this.test.user' are shared to get the correct scopes
  beforeEach(function(done) {
    mongoose.connection.dropDatabase()
      .then(() => {
        const user = new User();
        user.username = 'iflix-user';
        user.password = 'password123';

        user.save((err, user) => {
          // can be accessed inside 'it' scope as this.test.user
          this.currentTest.user = user;

          const payload = {id: user._id};
          // can be accessed inside 'it' scope as this.test.userToken
          this.currentTest.userToken = jwt.sign(payload, process.env.JWT_SECRET);

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

  describe('1. Users Signup (POST /signup)', () => {
    describe('1.1 Successful requests', () => {
      it('should be a successful status 200 API call', done => {
        request(usersApiEndPoint)
          .post('/signup?username=movie-lover&password=safepassword')
          .end((err, res) => {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should return the same user as posted', done => {
        request(usersApiEndPoint)
          .post('/signup?username=movie-lover&password=safepassword')
          .end((err, res) => {
            res.should.have.property('status', 200);
            const user = res.body.data;
            user.should.be.an.instanceOf(Object).and.have.property('username', 'movie-lover');
            done();
          });
      });

      it('should not return the password', done => {
        request(usersApiEndPoint)
          .post('/signup?username=movie-lover&password=safepassword')
          .end((err, res) => {
            res.should.have.property('status', 200);
            const user = res.body.data;
            user.should.be.an.instanceOf(Object).and.not.have.property('password');
            done();
          });
      });
    });

    describe('1.2 Unsuccessful requests', () => {
      it('should give an error with status 500 for missing username', done => {
        request(usersApiEndPoint)
          .post('/signup?password=safepassword')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });

      it('should give an error with status 500 for missing password', done => {
        request(usersApiEndPoint)
          .post('/signup?username=movie-lover')
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });

      it('should give an error with status 409 for username which already exists', done => {
        request(usersApiEndPoint)
          .post('/signup?username=iflix-user&password=someotherpassword')
          .end((err, res) => {
            res.should.have.property('status', 409);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('duplicateUsername');
            done();
          });
      });
    });
  });

  describe('2. Users Login (POST /login)', () => {
    describe('2.1 Successful requests', () => {
      it('should be a successful status 200 API call', function(done) {
        request(usersApiEndPoint)
          .post('/login?username=' + this.test.user.username + '&password=' + this.test.user.password)
          .end((err, res) => {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should respond with a userId, userRole and token', function(done) {
        request(usersApiEndPoint)
          .post('/login?username=' + this.test.user.username + '&password=' + this.test.user.password)
          .end((err, res) => {
            res.should.have.property('status', 200);
            const userPayload = res.body.data;
            userPayload.should.be.an.instanceOf(Object).and.have.property('userId');
            userPayload.should.be.an.instanceOf(Object).and.have.property('userRole');
            userPayload.should.be.an.instanceOf(Object).and.have.property('token');
            done();
          });
      });
    });

    describe('2.2 Unsuccessful requests', () => {
      it('should give an error with status 404 for incorrect password', function(done) {
        request(usersApiEndPoint)
          .post('/login?username=' + this.test.user.username + '&password=wrong-password')
          .end((err, res) => {
            res.should.have.property('status', 404);
            done();
          });
      });
    });
  });

  describe('3. Users Update (PUT /:id)', () => {
    describe('3.1 Successful requests', () => {
      it('should be a successful status 200 API call', function(done) {
        request(usersApiEndPoint)
          .put('/' + this.test.user._id + '?password=safepassword')
          .set({'Authorization': 'JWT ' + this.test.userToken})
          .end((err, res) => {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should have successfully the updated user\'s password', function(done) {
        request(usersApiEndPoint)
          .put('/' + this.test.user._id + '?password=safepassword')
          .set({'Authorization': 'JWT ' + this.test.userToken})
          .end((err, res) => {
            res.should.have.property('status', 200);
            User.findById(this.test.user._id).exec((err, user) => {
              user.toObject().should.be.an.instanceOf(Object).and.have.property('password', 'safepassword');
              done();
            });
          });
      });
    });

    describe('3.2 Unsuccessful requests', () => {
      it('should give an error with status 401 for unmatching token userId and params userId', function(done) {
        // generate random mongoose ID
        let randomId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomId ending up to be the same
        while (this.test.user._id == randomId) {
          randomId = mongoose.Types.ObjectId();
        };

        request(usersApiEndPoint)
          .put('/' + randomId + '?username=movie-lover&password=safepassword')
          .set({'Authorization': 'JWT ' + this.test.userToken})
          .end((err, res) => {
            res.should.have.property('status', 401);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('unauthorized');
            done();
          });
      });

      it('should give an error with status 500 for missing password', function(done) {
        request(usersApiEndPoint)
          .put('/' + this.test.user._id)
          .set({'Authorization': 'JWT ' + this.test.userToken})
          .end((err, res) => {
            res.should.have.property('status', 500);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('validationErrors');
            done();
          });
      });
    });
  });

  describe('4. Users Change Role (POST /change-role)', () => {
    describe('4.1 Successful requests', () => {
      it('admin can change another user\'s role successfully', function(done) {
        const user = new User();
        user.username = 'admin-user';
        user.password = 'special-password';
        user.role = 'admin'

        user.save((err, user) => {
          const payload = {id: user._id};
          const adminToken = jwt.sign(payload, process.env.JWT_SECRET);

          request(usersApiEndPoint)
            .post('/change-role?userId=' + this.test.user._id + '&role=admin')
            .set({'Authorization': 'JWT ' + adminToken})
            .end((err, res) => {
              res.should.have.property('status', 200);
              done();
            });
        });
      });
    });

    describe('4.2 Unsuccessful requests', () => {
      it('should give an error with status 401 for a non-admin user attempting to change roles', function(done) {
        request(usersApiEndPoint)
          .post('/change-role?userId=' + this.test.user._id + '&role=admin')
          .set({'Authorization': 'JWT ' + this.test.userToken})
          .end((err, res) => {
            res.should.have.property('status', 401);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('unauthorized');
            done();
          });
      });
    });
  });

  describe('5. Users Destroy (DELETE /:id)', () => {
    describe('5.1 Successful requests', () => {
      it('should be a successful status 200 API call', function(done) {
        request(usersApiEndPoint)
          .delete('/' + this.test.user._id)
          .set({'Authorization': 'JWT ' + this.test.userToken})
          .end((err, res) => {
            res.should.have.property('status', 200);
            done();
          });
      });

      it('should remove the user successfully', function(done) {
        request(usersApiEndPoint)
          .delete('/' + this.test.user._id)
          .set({'Authorization': 'JWT ' + this.test.userToken})
          .end((err, res) => {
            res.should.have.property('status', 200);
            User.find({}, (mongoErrors, users) => {
              users.should.be.instanceof(Array).and.have.lengthOf(0);
              done();
            });
          });
      });

      it('admin can remove another user successfully', function(done) {
        const user = new User();
        user.username = 'admin-user';
        user.password = 'special-password';
        user.role = 'admin'

        user.save((err, user) => {
          const payload = {id: user._id};
          const adminToken = jwt.sign(payload, process.env.JWT_SECRET);

          request(usersApiEndPoint)
            .delete('/' + this.test.user._id)
            .set({'Authorization': 'JWT ' + adminToken})
            .end((err, res) => {
              res.should.have.property('status', 200);
              done();
            });
        });
      });
    });

    describe('5.2 Unsuccessful requests', () => {
      it('should give an error with status 401 for unmatching token userId and params userId', function(done) {
        // generate random mongoose ID
        let randomId = mongoose.Types.ObjectId();

        // account for very unlikely edge case of randomId ending up to be the same
        while (this.test.user._id == randomId) {
          randomId = mongoose.Types.ObjectId();
        };

        request(usersApiEndPoint)
          .delete('/' + randomId)
          .set({'Authorization': 'JWT ' + this.test.userToken})
          .end((err, res) => {
            res.should.have.property('status', 401);
            const errors = res.body.errors;
            errors.should.be.an.instanceOf(Object).and.have.property('unauthorized');
            done();
          });
      });
    });
  });
});
