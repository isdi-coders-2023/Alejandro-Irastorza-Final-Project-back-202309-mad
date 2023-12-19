import { FileInterceptor } from './file.interceptor';
import 'crypto';

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue(''),
}));

describe('Given FileInterceptorClass', () => {
  const fileInterceptor = new FileInterceptor();

  test('it should return a middleware of type function ', () => {
    const result = fileInterceptor.singleFileStore();
    expect(typeof result).toBe('function');
  });

  // Test('it should set up multer with expected options', () => {
  //   const multerInstance = multer({
  //     storage: multer.diskStorage({
  //       destination: './public/uploads',
  //       filename(_req, file, callback) {
  //         const prefix = crypto.randomUUID();
  //         callback(null, prefix + '-alien-bar-' + file.originalname);
  //       },
  //     }),
  //     limits: { fileSize: 8000000 },
  //   });

  //   const middleware = fileInterceptor.singleFileStore();

  //   const mockRequest = {} as Request;
  //   const mockResponse = {} as Response;
  //   const mockNext = jest.fn() as NextFunction;

  //   middleware(mockRequest, mockResponse, mockNext);

  //   expect(multerInstance).toBeDefined();
  // });
});
