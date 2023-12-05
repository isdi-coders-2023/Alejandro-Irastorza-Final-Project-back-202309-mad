import createDebug from 'debug';
import { Controller } from './controller.js';
import { User } from '../entities/user.js';
import { UsersMongoRepo } from '../repo/users/users.mongo.repo.js';
import { NextFunction, Request, Response } from 'express';

const debug = createDebug('AB:users:controller');

export class UsersController extends Controller<User> {
  constructor(protected repo: UsersMongoRepo) {
    super(repo);
    debug('Instantiated');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.login(req.body);
      res.status(204);
      res.statusMessage = 'Accepted';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
