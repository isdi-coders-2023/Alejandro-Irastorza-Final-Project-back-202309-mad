import { Product } from '../entities/product';
import { ProductsMongoRepo } from '../repo/products/products.mongo.repo';
import createDebug from 'debug';
import { Controller } from './controller';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error/http.error';

const debug = createDebug('AB:products:controller');

export class ProdcutsController extends Controller<Product> {
  constructor(protected repo: ProductsMongoRepo) {
    super(repo);
    debug('Instantiated');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file)
        throw new HttpError(406, 'Not Acceptable', 'Multer file is invalid');

      const imgData = await this.cloudinaryService.uploadImageToCloudinary(
        req.file.path
      );

      req.body.modelImg = imgData;
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
