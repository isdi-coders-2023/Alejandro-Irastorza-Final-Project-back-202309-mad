import createDebug from 'debug';
import { Controller } from './controller.js';
import { User } from '../entities/user.js';
import { UsersMongoRepo } from '../repo/users/users.mongo.repo.js';
import { NextFunction, Request, Response } from 'express';
import { Auth } from '../services/auth.js';
import { LoginResponse } from '../types/login.response.js';
import { HttpError } from '../types/http.error/http.error.js';

const debug = createDebug('AB:users:controller');

export class UsersController extends Controller<User> {
  constructor(protected repo: UsersMongoRepo) {
    super(repo);
    debug('Instantiated');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.login(req.body);
      const data: LoginResponse = {
        user: result,
        token: Auth.getTokenJWT({ id: result.id, email: result.email }),
      };

      res.status(200);
      res.statusMessage = 'Ok';
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    if (!req.file)
      throw new HttpError(406, 'Not Acceptable', 'Multer file is invalid');

    const imgData = await this.cloudinaryService.uploadImageToCloudinary(
      req.file.path
    );

    req.body.profilePic = imgData;
    super.create(req, res, next);
  }
}
