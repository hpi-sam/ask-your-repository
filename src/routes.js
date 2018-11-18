// @flow
import type { $Application as Application } from 'express';
import configureMulter from './middleware/configureMulter';
import ImageController from './controllers/ImageController';
import TagController from './controllers/TagController';

const routes = (app: Application) => {
  const upload = configureMulter();

  app.post('/images', upload.single('image'), ImageController.upload);
  app.get('/images', ImageController.index);
  app.post('/images/:id/tags', TagController.add);
};

export default routes;
