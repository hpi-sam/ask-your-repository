// @flow
import type { $Application as Application } from 'express';
import configureMulter from './middleware/configureMulter';
import ImageController from './controllers/ImageController';

const routes = (app: Application) => {
  const upload = configureMulter();

  app.post('/images', upload.single('image'), ImageController.upload);
  app.get('/images', ImageController.index);
};

export default routes;
