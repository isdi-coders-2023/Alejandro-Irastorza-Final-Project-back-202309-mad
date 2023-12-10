import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { ProductsMongoRepo } from '../repo/products/products.mongo.repo.js';
import { ProdcutsController } from '../controllers/products.controller.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';

const debug = createDebug('AB:products:router');

export const productsRouter = createRouter();
debug('Starting Products Router');

const repo = new ProductsMongoRepo();
const controller = new ProdcutsController(repo);
const fileInterceptor = new FileInterceptor();

productsRouter.get('/', controller.getAll.bind(controller));
productsRouter.post(
  '/admin/products',
  fileInterceptor.singleFileStore('modelImg').bind(fileInterceptor),
  controller.create.bind(controller)
);

productsRouter.patch(
  '/admin/products/:id',
  fileInterceptor.singleFileStore('modelImg').bind(fileInterceptor),
  controller.update.bind(controller)
);

productsRouter.delete(
  '/admin/products/:id',
  controller.delete.bind(controller)
);

productsRouter.get('/admin/products/:id', controller.getById.bind(controller));
