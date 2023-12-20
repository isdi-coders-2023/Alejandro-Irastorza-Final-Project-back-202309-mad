import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../types/http.error/http.error.js';
import { Auth } from '../services/auth.js';

export class AuthInterceptor {
  authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenHeader = req.get('Authorization');

      if (!tokenHeader?.startsWith('Bearer'))
        throw new HttpError(401, 'Unautorized');

      const token = tokenHeader?.split(' ')[1];

      const tokenPayload = Auth.verifyAndGetPayload(token!);

      req.body.userId = tokenPayload.id;

      next();
    } catch (error) {
      next(error);
    }
  }
}
