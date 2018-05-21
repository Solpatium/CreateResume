require('dotenv').config()
var app = require('../app');
var request = require('supertest');
var chai = require('chai')
var expect = chai.expect;

describe('Server test', function() {
    it('should reject user who is not logged in', function(done) {
      request(app)
        .get('/user')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
});