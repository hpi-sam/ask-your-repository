// @flow
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import nock from 'nock';
import app from '../src/app';


describe('app', () => {
  const elija = nock(process.env.ELIJA_URL);
    const uploadPath: string = process.env.UPLOAD_PATH;

  describe('upload', () => {
    beforeEach(() => {
      elija.post('/artefacts/image').reply(200);
    });

    it('an image has status 200', (done) => {
      request(app).post('/images')
        .attach('image', 'spec/test.jpg')
        .end((err, res) => {
          expect(res.status).to.equal(200); // 'success' status
        done();
      });
    });

    it('an image creates an image file in /uploads/', (done) => {
      expect((stepDone) => {
        request(app).post('/images')
          .attach('image', 'spec/test.jpg')
          .end(stepDone);
      }).to.alter(() => fs.readdirSync(uploadPath).length, { by: 1, callback: done });
    });
  });
    after(() => {
      fs.readdir(uploadPath, (err, files) => {
        files.forEach((file) => {
          fs.unlink(path.join(uploadPath, file));
        });
      });
    });
  });
});
