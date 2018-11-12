// @flow
import request from 'supertest';
import fs from 'fs';
import path from 'path';
// import faker from 'faker';
// import should from 'should';
import app from '../src/app';


describe('app', () => {
  describe('upload', () => {
    let postRequest;
    const uploadPath: string = process.env.UPLOAD_PATH;

    before(() => {

    });

    beforeEach(() => {
      postRequest = request(app)
        .post('/images')
        .attach('image', 'spec/test.jpg');
    });

    it('an image has status 200', (done) => {
      postRequest.end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('an image creates an image file in the upload directory', (done) => {
      expect((stepDone) => {
        postRequest.end(stepDone);
      }).to.alter(() => fs.readdirSync(uploadPath).length, { by: 1, callback: done });
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
