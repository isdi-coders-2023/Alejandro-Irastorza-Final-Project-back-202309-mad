import { ImgData } from '../types/img.data.js';

export type User = {
  id: string;
  name: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  password: string;
  role: 'Admin' | 'SubAdmin';
  profilePic: ImgData;
};
