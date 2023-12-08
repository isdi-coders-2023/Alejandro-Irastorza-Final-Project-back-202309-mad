import { Request, Response } from 'express';
import { UsersController } from './users.controller';
import { UsersMongoRepo } from '../repo/users/users.mongo.repo.js';
import { MediaFiles } from '../services/media.file';

jest.mock('../services/auth.js', () => ({
  Auth: {
    getTokenJWT: jest.fn().mockReturnValue(''),
  },
}));

describe('Given UsersController class', () => {
  let controller: UsersController;
  let mockRequest: Request;
  let mockRequestWithNoFile: Request;
  let mockResponse: Response;
  let mockNext: jest.Mock;
  let mockFile;

  beforeEach(() => {
    mockFile = {
      fieldname: 'profilePic',
      originalname: 'test.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: '/tmp',
      filename: 'test.jpg',
      path: '/tmp/test.jpg',
      size: 12345,
    };

    mockRequest = {
      body: {},
      params: {},
      query: { key: 'value' },
      file: mockFile,
    } as unknown as Request;

    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
      statusMessage: '',
    } as unknown as Response;

    mockRequestWithNoFile = {
      body: {},
      params: {},
      query: { key: 'value' },
    } as unknown as Request;

    mockNext = jest.fn();
  });
  describe('When we instantiate it without errors', () => {
    const mockRepo = {
      create: jest.fn().mockResolvedValue({}),
      getById: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue(undefined),
      login: jest.fn().mockResolvedValue({}),
      getAll: jest.fn().mockResolvedValue([{}]),
    } as unknown as UsersMongoRepo;

    controller = new UsersController(mockRepo);
    const mockImageData = { url: 'http://example.com/image.jpg' };

    const mockCloudinaryService = {
      uploadImageToCloudinary: jest.fn().mockResolvedValue(mockImageData),
    };
    controller.cloudinaryService = mockCloudinaryService as MediaFiles;

    test('Then create should...', async () => {
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({});
      expect(mockRepo.create).toHaveBeenCalledWith({
        profilePic: mockImageData,
      });
      expect(
        mockCloudinaryService.uploadImageToCloudinary
      ).toHaveBeenCalledWith('/tmp/test.jpg');
    });

    test('Then update should...', async () => {
      await controller.update(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test('Then delete should...', async () => {
      await controller.delete(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test('Then login should...', async () => {
      await controller.login(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({ token: '', user: {} });
    });

    test('Then getAll should...', async () => {
      await controller.getAll(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });
  });

  describe('When we instantiate with errors', () => {
    let mockError: Error;

    beforeEach(() => {
      mockError = new Error('Mocked Error');

      const mockRepo = {
        create: jest.fn().mockRejectedValue(mockError),
        getById: jest.fn().mockRejectedValue(mockError),
        update: jest.fn().mockRejectedValue(mockError),
        delete: jest.fn().mockRejectedValue(mockError),
        login: jest.fn().mockRejectedValue(mockError),
        getAll: jest.fn().mockRejectedValue(mockError),
      } as unknown as UsersMongoRepo;

      controller = new UsersController(mockRepo);
    });

    test('Then create should...', async () => {
      await controller.create(mockRequestWithNoFile, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    test('Then login should...', async () => {
      await controller.login(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenLastCalledWith(mockError);
    });

    test('Then update should...', async () => {
      await controller.update(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenLastCalledWith(mockError);
    });

    test('Then delete should...', async () => {
      await controller.delete(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenLastCalledWith(mockError);
    });

    test('Then getAll should...', async () => {
      await controller.getAll(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenLastCalledWith(mockError);
    });
  });
});
