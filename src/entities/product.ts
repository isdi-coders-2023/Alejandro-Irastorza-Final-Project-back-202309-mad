import { ImgData } from '../types/img.data.js';
import { User } from './user.js';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  modelImg: ImgData;
  refImg: ImgData;
  new: boolean;
  noStock: boolean;
  topOrder: boolean;
  creator: User;
};
