import createDebug from 'debug';
import { hash, compare } from 'bcrypt';

const debug = createDebug('AB:auth');
debug('Imported');

export abstract class Auth {
  static secret = process.env.JWT_SECRET;

  static hashPassword(value: string): Promise<string> {
    const saltRound = 10;
    return hash(value, saltRound);
  }

  static compare(value: string, hashedPswd: string): Promise<boolean> {
    return compare(value, hashedPswd);
  }
}
