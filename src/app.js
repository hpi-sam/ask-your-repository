// @flow
import express from 'express';
import type { $Request as Request, $Response as Response } from 'express';
import logger from './logger';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/', (req: Request, res: Response) => {
  logger.info(`Request ${req}...`);
  res.send('Hello World!');
});
export default app;
