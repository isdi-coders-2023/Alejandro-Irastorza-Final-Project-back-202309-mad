import { NextFunction, Request, Response } from 'express';
import { AuthInterceptor } from './auth.interceptor';
import { HttpError } from '../types/http.error/http.error';
import { Auth } from '../services/auth';

jest.mock('../services/auth');

const interceptor = new AuthInterceptor();

const mockRequest = {
  get: jest.fn(() => 'Bearer 12345'),
  body: {
    userId: '',
  },
} as unknown as Request;

const mockRequestWithNoHeader = {
  get: jest.fn(() => {}),
} as unknown as Request;

const mockResponse = {} as Response;

const mockNext = jest.fn() as NextFunction;

describe('Given AuthInterceptor class', () => {
  describe('When request has no Authorization header ', () => {
    test('then it should throw an error', () => {
      interceptor.authorization(
        mockRequestWithNoHeader,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(new HttpError(404, 'Unautorized'));
    });
  });

  describe('When request has valid Authorization header', () => {
    test('then it should add userId to the request body ', () => {
      (Auth.verifyAndGetPayload as jest.Mock).mockReturnValue({ id: '123' });
      interceptor.authorization(mockRequest, mockResponse, mockNext);
      expect(mockRequest.body.userId).toBe('123');
    });
  });
});
