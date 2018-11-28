// @flow
import request from 'supertest';
import nock from 'nock';
import app from '../../src/app';

describe('POST /images/:id/tags', () => {
  const elija = nock(process.env.ELIJA_URL);
  beforeEach(() => {
    elija.put('/artefacts/db20072d-38dc-4226-83ff-f204b4366118').reply(200);
  });
  const sendRequest = id => request(app).post(`/images/${id}/tags`)
    .set('Accept', 'application/json').send({ tags: ['blub'] });
  context('valid request', () => {
    let response;
    beforeEach(async () => {
      response = await sendRequest('db20072d-38dc-4226-83ff-f204b4366118');
    });
    it('has status 200', (done) => {
      expect(response.status).to.equal(200);
      done();
    });
  });
  context('invalid uuid', () => {
    let response;
    beforeEach(async () => {
      response = await sendRequest('invalid ID LUL');
    });
    it('has status 422', (done) => {
      expect(response.status).to.equal(422);
      done();
    });
  });
});
