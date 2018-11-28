// @flow
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import nock from 'nock';
import app from '../src/app';


describe('app', () => {
  const elija = nock(process.env.ELIJA_URL);
  const uploadPath: string = process.env.UPLOAD_PATH;


  describe('GET /images', () => {
    context('valid request', () => {
      let response;
      beforeEach(async () => {
        elija.get('/artefacts').reply(200, {
          results:
        [{
          _id: 'db20072d-38dc-4226-83ff-f204b4366118',
          _index: 'artefact',
          _score: 0.5753642,
          _source: {
            created_at: '2018-11-14T12:41:26.754071',
            file_url: 'class_diagram.png',
            tags: ['uml', 'class diagram', 'architecture'],
          },
          _type: 'image',
          sort: [
            0.5753642,
            1542199286754,
          ],
        },
        {
          _id: 'db20072d-38dc-4226-83ff-f204b4366118',
          _index: 'artefact',
          _score: 0.5753642,
          _source: {
            created_at: '2018-11-14T12:41:26.754071',
            file_url: 'class_diagram.png',
            tags: ['uml', 'class diagram', 'architecture'],
          },
          _type: 'image',
          sort: [
            0.5753642,
            1542199286754,
          ],
        },
        ],
        });
        response = await request(app).get('/images').set('Accept', 'application/json').send();
      });

      it('has status 200', (done) => {
        expect(response.status).to.equal(200);
        done();
      });

      it('warps image objects', (done) => {
        expect(response.body.images.length).to.equal(2);
        expect(response.body.images[0].url).to.equal('class_diagram.png');
        expect(response.body.images[0].id).to.equal('db20072d-38dc-4226-83ff-f204b4366118');
        // Only using eql to check for lose equality, since we don't care about object identity
        expect(response.body.images[0].tags).to.eql(['uml', 'class diagram', 'architecture']);
        done();
      });
    });
    describe('possible errors', () => {
      context('elija not connected', () => {
        let response;
        beforeEach(async () => {
          response = await request(app).get('/images').set('Accept', 'application/json').send();
        });
        it('has status 503', (done) => {
          expect(response.status).to.equal(503);
          done();
        });
      });
    });
  });

  describe('POST /Images (upload)', () => {
    context('valid request', () => {
      beforeEach(() => {
        elija.post('/artefacts').reply(200);
      });

      it('has status 200', (done) => {
        request(app).post('/images')
          .attach('image', 'spec/test.jpg')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });

      it('creates an image file in /uploads/', (done) => {
        expect((stepDone) => {
          request(app).post('/images')
            .attach('image', 'spec/test.jpg')
            .end(stepDone);
        }).to.alter(() => fs.readdirSync(uploadPath).length, { by: 1, callback: done });
      });
      after(() => {
        // delete files in uploads directory
        fs.readdir(uploadPath, (err, files) => {
          files.forEach((file) => {
            const filePath = path.join(uploadPath, file);
            fs.unlinkSync(filePath);
          });
        });
      });
    });

    describe('possible errors', () => {
      context('elija not connected', () => {
        let response;
        beforeEach(async () => {
          response = await request(app).get('/images').set('Accept', 'application/json').send();
        });
        it('has status 503', (done) => {
          expect(response.status).to.equal(503);
          done();
        });
      });

      context('elija throws error', () => {
        let response;
        beforeEach(async () => {
          elija.post('/artefacts/image').reply(503);
          response = await request(app).get('/images').set('Accept', 'application/json').send();
        });
        it('has status 503', (done) => {
          expect(response.status).to.equal(503);
          done();
        });
      });
    });
  });
  describe('POST /images/:id/tags', () => {
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
});
