// @flow
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import ErrorHandler from './errors/ErrorHandler';


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
app.options('*', cors());

routes(app);
app.use(ErrorHandler);


export default app;
