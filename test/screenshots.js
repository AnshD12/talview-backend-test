/* eslint-disable no-unused-vars */
/* global describe, it, beforeEach */
process.env.NODE_ENV = 'testing';
const appRoot = require('app-root-path');
const chai = require('chai');
const chaiHttp = require('chai-http');
// server
const index = require('../index');

const should = chai.should();
const file = `${appRoot}/test/test-data/test.mp4`;
chai.use(chaiHttp);

describe('Server', () => {
  describe('/', () => {
    it('should check server status', (done) => {
      chai.request(index)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/createScreenshots', () => {
    it('should create 4 screenshots and return URLs', (done) => {
      chai.request(index)
        .post('/createScreenshots')
        .attach('video', file)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('filename');
          res.body.should.have.property('screenshots');
          done();
        });
    });
  });
});
