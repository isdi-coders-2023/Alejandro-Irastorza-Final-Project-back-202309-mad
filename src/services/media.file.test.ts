import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { MediaFiles } from './media.file';
import { ImgData } from '../types/img.data';
import { HttpError } from '../types/http.error/http.error';

jest.mock('cloudinary');

const mediaFiles = new MediaFiles();

describe('Given Auth class', () => {
  describe('when uploadImageToCloudinary is succesful', () => {
    test('then it should return an objet of type imageData ', async () => {
      (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(
        {} as UploadApiResponse
      );
      const result = await mediaFiles.uploadImageToCloudinary('');

      expect(cloudinary.uploader.upload).toHaveBeenCalled();
      expect(result).toEqual({} as ImgData);
    });

    describe('when uploadImageToCloudinary is not succesful', () => {
      test('then it should throw an error ', async () => {
        (cloudinary.uploader.upload as jest.Mock).mockRejectedValue(
          Error('Error test')
        );

        try {
          await mediaFiles.uploadImageToCloudinary('');
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
          expect(HttpError).toThrow();
        }
      });
    });
  });
});
