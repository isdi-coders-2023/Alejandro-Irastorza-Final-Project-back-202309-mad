import { ImgData } from '../types/img.data.js';
import { Category } from './category.js';
import { User } from './user.js';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  modelImg: ImgData;
  refImg: ImgData;
  new: boolean;
  noStock: boolean;
  topOrder: boolean;
  creator: User;
};
