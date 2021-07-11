/* global it, describe */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;
chai.use(chaiHttp);

describe('API server runs', () => {
  it('requesting / will have status 200', (done) => {
    chai.request(app).get('/').end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe('/version API endpoint', () => {
  it('GET request /version has a status of 200', (done) => {
    chai.request(app).get('/version').end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('POST request /version has a status of 200', (done) => {
    chai.request(app).post('/version').end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('GET request /version reports valid version as JSON', (done) => {
    chai.request(app).get('/version').end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.api).to.equal('1.2.3');
      expect(res.body.server).to.equal('1.0.0');
      done();
    });
  });
  it('POST request /version reports valid version as JSON', (done) => {
    chai.request(app).post('/version').end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.api).to.equal('1.2.3');
      expect(res.body.server).to.equal('1.0.0');
      done();
    });
  });
});

describe('/v1/check API endpoint', () => {
  it('GET request /v1/check without a parameter has a status of 400', (done) => {
    chai.request(app).get('/check').end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('POST request /v1/check without a parameter has a status of 400', (done) => {
    chai.request(app).post('/check').end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
});

describe('/v1/start API endpoint', () => {
  it('GET request /v1/start without a parameter has a status of 400', (done) => {
    chai.request(app).get('/start').end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('POST request /v1/start without a parameter has a status of 400', (done) => {
    chai.request(app).post('/start').end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
});

describe('/v1/continue API endpoint', () => {
  it('GET request /v1/continue without a parameter has a status of 400', (done) => {
    chai.request(app).get('/continue').end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('POST request /v1/continue without a parameter has a status of 400', (done) => {
    chai.request(app).post('/continue').end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
});
