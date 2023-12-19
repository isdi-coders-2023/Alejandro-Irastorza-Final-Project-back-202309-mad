/* eslint-disable prefer-destructuring */
import { Product } from '../entities/product.js';
import { ProductsMongoRepo } from '../repo/products/products.mongo.repo';
import createDebug from 'debug';
import { Controller } from './controller.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error/http.error.js';

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

      const userId = req.body.userId;

      const imgData = await this.cloudinaryService.uploadImageToCloudinary(
        req.file.path
      );

      req.body.modelImg = imgData;
      req.body.creator = userId;
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    if (req.file) {
      const imgData = await this.cloudinaryService.uploadImageToCloudinary(
        req.file.path
      );

      req.body.modelImg = imgData;
    }

    super.update(req, res, next);
  }

  async getByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.getByCategory(req.params.category);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
