// @flow
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
app.options('*', cors());

routes(app);


export default app;
