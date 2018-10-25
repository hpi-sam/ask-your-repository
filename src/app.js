// @flow
import express from 'express';
import type { $Request as Request, $Response as Response } from 'express';
import bodyParser from 'body-parser';
import logger from './logger';

const app = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/', (req: Request, res: Response) => {
  logger.info(`Requested paramters were: ${JSON.stringify(req.body.queryResult.parameters)}`);
  logger.info(`Request ${JSON.stringify(req.body)}...`);

  const artifact = req.body.queryResult.parameters.Artifact;
  // const date = req.body.queryResult.parameters;

  logger.info(`Artifact was: ${artifact}`);
  // logger.info(`Date was: ${date}`);
  res.send('Hello World!');
});
export default app;
