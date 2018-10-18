// @flow
import express from 'express';
import type { $Request as Request, $Response as Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
