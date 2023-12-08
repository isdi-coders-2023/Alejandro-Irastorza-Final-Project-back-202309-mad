import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { MediaFiles } from './media.file';
import { ImgData } from '../types/img.data';

jest.mock('cloudinary');

test('then uploadImageToCloudinary should ', async () => {
  (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(
    {} as UploadApiResponse
  );

  const mediaFiles = new MediaFiles();

  const result = await mediaFiles.uploadImageToCloudinary('');

  expect(cloudinary.uploader.upload).toHaveBeenCalled();

  expect(result).toEqual({} as ImgData);
});
