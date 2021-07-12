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
      expect(res.body.api).to.equal('1.2.6');
      expect(res.body.server).to.equal('1.1.1');
      done();
    });
  });
  it('POST request /version reports valid version as JSON', (done) => {
    chai.request(app).post('/version').end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.api).to.equal('1.2.6');
      expect(res.body.server).to.equal('1.1.1');
      done();
    });
  });
});

describe('/v1/check API endpoint', () => {
  it('GET request /v1/check without a parameter has a status of 400', (done) => {
    chai.request(app).get('/v1/check').end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('POST request /v1/check without a parameter has a status of 400', (done) => {
    chai.request(app).post('/v1/check').end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
  it('GET request /v1/check/0bc-a81c71 returns valid governance data', (done) => {
    chai.request(app).get('/v1/check/0bc-a81c71').end((err, res) => {
      expect(res.body.function).to.equal('a');
      expect(res.body.current).to.equal(18.8);
      expect(res.body.date.substring(0, 33)).to.equal('Fri Nov 01 2019 13:27:00 GMT+0000');
      done();
    });
  });
  it('POST request /v1/check with code 0bc-a81c71 returns valid governance data', (done) => {
    chai.request(app).post('/v1/check').send({ governance: '0bc-a81c71' }).end((err, res) => {
      expect(res.body.function).to.equal('a');
      expect(res.body.current).to.equal(18.8);
      expect(res.body.date.substring(0, 33)).to.equal('Fri Nov 01 2019 13:27:00 GMT+0000');
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
  it('GET request /v1/start/15.6 returns correct data', (done) => {
    chai.request(app).get('/v1/start/glucose/15.6').end((err, res) => {
      expect(res.body.rateNum).to.equal(3);
      expect(res.body.rate).to.equal('3');
      expect(res.body.advice.text[0]).to.equal('Start insulin at 3 units/hr');
      expect(res.body.hex.substring(0, 3)).to.equal('09c');
      done();
    });
  });
  it('POST request /v1/start with glucose of 15.6 returns correct data', (done) => {
    chai.request(app).post('/v1/start').send({ glucose: 15.6 }).end((err, res) => {
      expect(res.body.rateNum).to.equal(3);
      expect(res.body.rate).to.equal('3');
      expect(res.body.advice.text[0]).to.equal('Start insulin at 3 units/hr');
      expect(res.body.hex.substring(0, 3)).to.equal('09c');
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
  it('GET request /v1/continue/glucose/15.0/previous/13.0/rate/2 returns correct data', (done) => {
    chai.request(app).get('/v1/continue/glucose/15.0/previous/13.0/rate/2').end((err, res) => {
      expect(res.body.rateNum).to.equal(4);
      expect(res.body.rate).to.equal('4ml/hr');
      expect(res.body.advice.text[0]).to.equal('Recheck blood glucose in 1 hour.');
      done();
    });
  });
  it('POST request /v1/continue/glucose/15.0/previous/13.0/rate/2 returns correct data', (done) => {
    chai.request(app).post('/v1/continue').send({ glucose: 15.0, previous: 13.0, rate: 2 }).end((err, res) => {
      expect(res.body.rateNum).to.equal(4);
      expect(res.body.rate).to.equal('4ml/hr');
      expect(res.body.advice.text[0]).to.equal('Recheck blood glucose in 1 hour.');
      done();
    });
  });
});

describe('root page gets api docs', () => {
  it('GET request / has status code of 200', (done) => {
    chai.request(app).get('/').end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('GET request / shows HTML documentation', (done) => {
    chai.request(app).get('/').end((err, res) => {
      expect(res).to.be.html; // eslint-disable-line
      expect(res).to.have.header('content-type', 'text/html; charset=UTF-8');
      expect(res.text).to.contain('</html>');
      done();
    });
  });
});

describe('/v1 redirects to api docs', () => {
  it('GET request /v1 has status code of 200', (done) => {
    chai.request(app).get('/v1').end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('GET request /v1 shows HTML documentation', (done) => {
    chai.request(app).get('/v1').end((err, res) => {
      expect(res).to.be.html; // eslint-disable-line
      expect(res).to.have.header('content-type', 'text/html; charset=UTF-8');
      expect(res.text).to.contain('</html>');
      done();
    });
  });
});
