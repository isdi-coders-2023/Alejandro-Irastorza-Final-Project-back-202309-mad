import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { ProductsMongoRepo } from '../repo/products/products.mongo.repo.js';
import { ProdcutsController } from '../controllers/products.controller.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('AB:products:router');

export const productsRouter = createRouter();
debug('Starting Products Router');

const repo = new ProductsMongoRepo();
const controller = new ProdcutsController(repo);
const fileInterceptor = new FileInterceptor();
const interceptor = new AuthInterceptor();

productsRouter.get('/', controller.getAll.bind(controller));
productsRouter.post(
  '/admin/add/:userId',
  interceptor.authorization.bind(interceptor),
  fileInterceptor.singleFileStore('modelImg').bind(fileInterceptor),
  controller.create.bind(controller)
);

productsRouter.patch(
  '/admin/update/:id',
  interceptor.authorization.bind(interceptor),
  fileInterceptor.singleFileStore('modelImg').bind(fileInterceptor),
  controller.update.bind(controller)
);

productsRouter.delete(
  '/admin/delete/:id',
  interceptor.authorization.bind(interceptor),
  controller.delete.bind(controller)
);

productsRouter.get('/admin/find/:id', controller.getById.bind(controller));

productsRouter.get(
  '/admin/category/:category',
  controller.getByCategory.bind(controller)
);
