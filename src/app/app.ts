import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import createDebug from 'debug';
import { usersRouter } from '../routers/users.router.js';

const debug = createDebug('AB:App');

export const app = express();
app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

app.use((_req: Request, _res: Response, next: NextFunction) => {
  debug('Error Middleware');
  next('error');
});

app.use('/users', usersRouter);
