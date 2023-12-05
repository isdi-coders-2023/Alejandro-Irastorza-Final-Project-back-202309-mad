import createDebug from 'debug';
import { User } from '../../entities/user.js';
import { Repository } from '../repo.js';
import { UserModel } from './users.mongo.model.js';
import { HttpError } from '../../types/http.error/http.error.js';

const debug = createDebug('AB:users:mongo:repo');

export class UsersMongoRepo implements Repository<User> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    if (!result)
      throw new HttpError(404, 'Not Found', 'getAll method not possible');
    return result;
  }

  async getById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (!result)
      throw new HttpError(404, 'Not Found', 'getByid method not possible');
    return result;
  }

  async create(newItem: Omit<User, 'id'>): Promise<User> {
    const result = await UserModel.create(newItem);
    return result;
  }

  async update(id: string, updatedItem: Partial<User>): Promise<User> {
    if (id === updatedItem.id)
      throw new HttpError(
        406,
        'Not Acceptable',
        'Is not possible to add yourself'
      );

    const result = await UserModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();

    if (!result)
      throw new HttpError(404, 'Not Found', 'Update was not possible');

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = UserModel.findByIdAndDelete(id);
    if (!result)
      throw new HttpError(404, 'Not Found', 'Delete was not possible');
  }
}
