import createDebug from 'debug';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user';
import 'dotenv/config';
import { HttpError } from '../types/http.error/http.error.js';

const debug = createDebug('AB:auth');
debug('Imported');

export type TokenPayload = {
  id: User['id'];
  email: User['email'];
} & jwt.JwtPayload;

export abstract class Auth {
  static secret = process.env.JWT_SECRET;

  static hashPassword(value: string): Promise<string> {
    const saltRound = 10;
    return hash(value, saltRound);
  }

  static compare(value: string, hashedPswd: string): Promise<boolean> {
    return compare(value, hashedPswd);
  }

  static getTokenJWT(payload: TokenPayload) {
    return jwt.sign(payload, Auth.secret!);
  }

  static verifyAndGetPayload(token: string) {
    try {
      const result = jwt.verify(token, Auth.secret!);

      if (typeof result === 'string')
        throw new HttpError(498, 'Invalid Token', result);
      return result as TokenPayload;
    } catch (error) {
      throw new HttpError(498, 'Invalid Token', (error as Error).message);
    }
  }
}
