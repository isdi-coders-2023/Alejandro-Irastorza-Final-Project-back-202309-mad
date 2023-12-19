import { compare, hash } from 'bcrypt';
import { Auth, TokenPayload } from './auth.js';
import jwt from 'jsonwebtoken';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Given Auth abstract class', () => {
  describe('When we use its methods', () => {
    describe('When we use hashPassword method', () => {
      test('then it should return hashed password', () => {
        (hash as jest.Mock).mockReturnValue('Test value');
        const result = Auth.hashPassword('');
        expect(hash).toHaveBeenCalled();
        expect(result).toBe('Test value');
      });
    });

    describe('When we use compare method', () => {
      test('then it should return true for matching passwords', () => {
        (compare as jest.Mock).mockReturnValue(true);
        const result = Auth.compare('', '');
        expect(compare).toHaveBeenCalled();
        expect(result).toBe(true);
      });
    });

    describe('When we use getTokenJWT method', () => {
      test('then it should return a token', () => {
        (jwt.sign as jest.Mock).mockReturnValue(true);
        const result = Auth.getTokenJWT({} as TokenPayload);
        expect(jwt.sign).toHaveBeenCalled();
        expect(result).toBe(true);
      });
    });

    describe('When we use verifyAndGetPayload method', () => {
      test('then it should verify token and return payload', () => {
        (jwt.verify as jest.Mock).mockReturnValue(true);
        const result = Auth.verifyAndGetPayload('');
        expect(jwt.verify).toHaveBeenCalled();
        expect(result).toBe(true);
      });
    });
  });

  describe('When its methods fail', () => {
    test('then verifyAndGetPayload method should throw an error', () => {
      (jwt.verify as jest.Mock).mockReturnValue('');

      try {
        Auth.verifyAndGetPayload('');
      } catch (error) {
        // Define the expected error message or assertion as needed
        expect((error as Error).message).toBe('');
      }
    });
  });
});
