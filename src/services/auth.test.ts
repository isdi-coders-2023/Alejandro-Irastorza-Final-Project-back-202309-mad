import { compare, hash } from 'bcrypt';
import { Auth, TokenPayload } from './auth.js';
import jwt from 'jsonwebtoken';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Given Auth abstract class', () => {
  describe('When we use its methods', () => {
    test('Then hashPassword should... ', () => {
      (hash as jest.Mock).mockReturnValue('Test value');
      const result = Auth.hashPassword('');
      expect(hash).toHaveBeenCalled();
      expect(result).toBe('Test value');
    });

    test('Then compare should ', () => {
      (compare as jest.Mock).mockReturnValue(true);
      const result = Auth.compare('', '');
      expect(compare).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    test('Then getTokenJWT should ', () => {
      (jwt.sign as jest.Mock).mockReturnValue(true);
      const result = Auth.getTokenJWT({} as TokenPayload);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });
});
