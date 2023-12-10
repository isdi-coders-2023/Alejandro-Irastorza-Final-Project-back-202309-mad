import { Product } from '../../entities/product.js';
import { Repository } from '../repo.js';
import createDebug from 'debug';
import { ProductModel } from './products.mongo.model.js';
import { HttpError } from '../../types/http.error/http.error.js';

const debug = createDebug('AB:products:mongo:repo');

export class ProductsMongoRepo implements Repository<Product> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<Product[]> {
    const result = await ProductModel.find().exec();
    if (!result)
      throw new HttpError(404, 'Not Found', 'getAll method not possible');
    return result;
  }

  async getById(id: string): Promise<Product> {
    const result = await ProductModel.findById(id).exec();
    if (!result)
      throw new HttpError(404, 'Not Found', 'findById method not possible');
    return result;
  }

  async create(newItem: Omit<Product, 'id'>): Promise<Product> {
    const result = await ProductModel.create(newItem);
    if (!result)
      throw new HttpError(404, 'Not Found', 'create method not possible');
    return result;
  }

  async update(id: string, updatedItem: Partial<Product>): Promise<Product> {
    if (id === updatedItem.id)
      throw new HttpError(
        406,
        'Not Acceptable',
        'It is not possible to add yourself'
      );
    const result = await ProductModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();

    if (!result)
      throw new HttpError(406, 'Not Found', 'Update was not possible');

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await ProductModel.findByIdAndDelete(id).exec();

    if (!result)
      throw new HttpError(406, 'Not Found', 'Delete was not possible');
  }
}
