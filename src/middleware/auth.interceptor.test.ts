import { NextFunction, Request, Response } from 'express';
import { AuthInterceptor } from './auth.interceptor';
import { HttpError } from '../types/http.error/http.error';
import { TokenPayload } from '../services/auth';

jest.mock('../services/auth', () => ({
  verifyAndGetPayload: jest
    .fn()
    .mockReturnValue({ email: '123', id: '123' } as TokenPayload),
}));

const interceptor = new AuthInterceptor();

const mockRequest = {
  get: jest.fn(() => 'Bearer 12345'),
  body: {
    userId: '' as TokenPayload['id'],
  },
} as unknown as Request;

const mockRequestWithNoHeader = {
  get: jest.fn(() => {}),
} as unknown as Request;

const mockResponse = {} as Response;

const mockNext = jest.fn() as NextFunction;

test('should ', () => {
  interceptor.authorization(mockRequest, mockResponse, mockNext);
  expect(mockNext).toHaveBeenCalled();
  expect(mockRequest.body.userId).toStrictEqual('');
});

test('should ', () => {
  interceptor.authorization(mockRequestWithNoHeader, mockResponse, mockNext);

  expect(mockNext).toHaveBeenCalledWith(new HttpError(404, 'Unautorized'));
});
