import { Product } from '../../entities/product.js';
import { ProductModel } from './products.mongo.model.js';
import { ProductsMongoRepo } from './products.mongo.repo.js';

describe('Given ProductsMongoRepo', () => {
  let repo: ProductsMongoRepo;
  describe('When we instantiated it without errors', () => {
    const exec = jest.fn().mockResolvedValue('Example result value');

    beforeEach(() => {
      ProductModel.findById = jest.fn().mockReturnValue({
        exec,
      });

      ProductModel.create = jest.fn().mockResolvedValue('Example result value');

      ProductModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec,
      });

      ProductModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec,
      });

      ProductModel.findOne = jest.fn().mockReturnValue({
        exec,
      });

      repo = new ProductsMongoRepo();
    });

    test('Then it should execute getAll()', async () => {
      ProductModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });
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
      const result = await repo.create({} as Omit<Product, 'id'>);
      expect(result).toBe('Example result value');
    });

    test('Then it should execute update()', async () => {
      const result = await repo.update('', {} as Partial<Product>);
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Example result value');
    });

    test('Then it should execute delete()', async () => {
      const result = await repo.delete('');
      expect(result).toBe(undefined);
      expect(exec).toHaveBeenCalled();
    });

    test('Then it should execute getByCategory()', async () => {
      ProductModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue([]),
      });
      const result = await repo.getByCategory('Sample');
      expect(result).toStrictEqual([]);
    });
  });

  describe('When we instantiate it with errors', () => {
    const exec = jest.fn().mockReturnValue(null);

    beforeEach(() => {
      ProductModel.findById = jest.fn().mockReturnValue({
        exec,
      });

      ProductModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec,
      });

      ProductModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec,
      });

      ProductModel.findOne = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({ exec }),
      });
      ProductModel.create = jest.fn().mockResolvedValue(undefined);

      repo = new ProductsMongoRepo();
    });

    test('Then should execute getAll() throwing an error', async () => {
      ProductModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({ exec }),
      });
      expect(repo.getAll()).rejects.toThrow();
    });

    test('Then should execute getById() throwing an error', async () => {
      expect(repo.getById('')).rejects.toThrow();
    });

    test('Then should execute update() throwing an error', async () => {
      expect(repo.update('', { id: '' } as Partial<Product>)).rejects.toThrow();

      expect(repo.update('', {} as Partial<Product>)).rejects.toThrow();
    });

    test('Then should execute delete() throwing an error', async () => {
      expect(repo.delete('')).rejects.toThrow();
    });

    test('Then should execute create() throwing an error', async () => {
      expect(repo.create({} as Omit<Product, 'id'>)).rejects.toThrow();
    });

    test('Then should execute getByCategory() throwing an error', async () => {
      ProductModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue(null),
      });
      expect(repo.getByCategory('')).rejects.toThrow();
    });
  });
});
