import { Request, Response } from 'express';
import { ProductsMongoRepo } from '../repo/products/products.mongo.repo.js';
import { MediaFiles } from '../services/media.file';
import { ProdcutsController } from './products.controller';

jest.mock('../services/auth.js', () => ({
  Auth: {
    getTokenJWT: jest.fn().mockReturnValue(''),
  },
}));

describe('Given UsersController class', () => {
  let controller: ProdcutsController;
  let mockRequest: Request;
  let mockRequestWithNoFile: Request;
  let mockResponse: Response;
  let mockNext: jest.Mock;
  let mockFile;

  beforeEach(() => {
    mockFile = {
      fieldname: 'modelImg',
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
    } as unknown as ProductsMongoRepo;

    controller = new ProdcutsController(mockRepo);
    const mockImageData = { url: 'http://example.com/image.jpg' };

    const mockCloudinaryService = {
      uploadImageToCloudinary: jest.fn().mockResolvedValue(mockImageData),
    };
    controller.cloudinaryService = mockCloudinaryService as MediaFiles;

    test('Then create should...', async () => {
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({});
      expect(mockRepo.create).toHaveBeenCalledWith({
        modelImg: mockImageData,
      });
      expect(
        mockCloudinaryService.uploadImageToCloudinary
      ).toHaveBeenCalledWith('/tmp/test.jpg');
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
      } as unknown as ProductsMongoRepo;

      controller = new ProdcutsController(mockRepo);
    });

    test('Then create should...', async () => {
      await controller.create(mockRequestWithNoFile, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
});