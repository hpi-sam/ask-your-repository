// @flow
import './config/setup';
import logger from './logger';
import app from './app';

const port: number = process.env.PORT;

app.listen(port, () => {
  logger.info(`Esra is listening on port ${port}...`);
});
