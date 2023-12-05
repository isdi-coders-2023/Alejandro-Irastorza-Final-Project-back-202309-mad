import { User } from '../../entities/user';
import { Auth } from '../../services/auth';
import { UserModel } from './users.mongo.model';
import { UsersMongoRepo } from './users.mongo.repo.js';

describe('Given UsersMongoRepo', () => {
  let repo: UsersMongoRepo;
  describe('When we instantiated it without errors', () => {
    const exec = jest.fn().mockResolvedValue('Example result value');

    beforeEach(() => {
      UserModel.find = jest.fn().mockReturnValue({
        exec,
      });

      UserModel.findById = jest.fn().mockReturnValue({
        exec,
      });

      UserModel.create = jest.fn().mockResolvedValue('Example result value');

      UserModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec,
      });

      UserModel.findByIdAndDelete = jest
        .fn()
        .mockResolvedValue('Example result value');

      UserModel.findOne = jest.fn().mockReturnValue({
        exec,
      });

      Auth.compare = jest.fn().mockReturnValue(true);

      repo = new UsersMongoRepo();
    });

    test('Then it should execute getAll()', async () => {
      const result = await repo.getAll();
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Example result value');
    });

    test('Then it should execute getById()', async () => {
      const result = await repo.getById('');
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Example result value');
    });

    test('Then it should execute create()', async () => {
      const result = await repo.create({ email: '' } as Omit<User, 'id'>);
      expect(result).toBe('Example result value');
    });

    test('Then it should execute update()', async () => {
      const result = await repo.update('', {} as Partial<User>);
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Example result value');
    });

    test('Then it should execute delete()', async () => {
      const result = await repo.delete('');
      expect(result).toBe(undefined);
    });

    test('Then it should execute login()', async () => {
      const result = await repo.login({} as User);
      expect(result).toBe('Example result value');
    });
  });

  describe('When we instantiate it with errors', () => {
    // Const exec = jest.fn().mockRejectedValue(new Error('Error Test'));
    const exec = jest.fn().mockResolvedValue(undefined);

    beforeEach(() => {
      UserModel.find = jest.fn().mockReturnValue({
        exec,
      });

      UserModel.findById = jest.fn().mockReturnValue({
        exec,
      });

      UserModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec,
      });

      UserModel.findByIdAndDelete = jest.fn().mockReturnValue(undefined);

      UserModel.findOne = jest.fn().mockReturnValue({
        exec,
      });

      repo = new UsersMongoRepo();
    });

    test('Then should execute getAll() throwing an error', async () => {
      expect(repo.getAll()).rejects.toThrow();
    });

    test('Then should execute getById() throwing an error', async () => {
      expect(repo.getById('')).rejects.toThrow();
    });

    test('Then should execute update() throwing an error', async () => {
      expect(repo.update('', { id: '' } as Partial<User>)).rejects.toThrow();

      expect(repo.update('', {} as Partial<User>)).rejects.toThrow();
    });

    test('Then should execute update() throwing an error', async () => {
      expect(repo.delete('')).rejects.toThrow();
    });

    test('Then should execute login() throwing an error', async () => {
      expect(repo.login({} as User)).rejects.toThrow();
    });
  });
});
