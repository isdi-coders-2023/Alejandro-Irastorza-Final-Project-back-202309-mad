import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repo/users/users.mongo.repo.js';
import { UsersController } from '../controllers/users.controller.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';

const debug = createDebug('AB:users:router');

export const usersRouter = createRouter();
debug('Starting Users Router');

const repo = new UsersMongoRepo();
const controller = new UsersController(repo);
const fileInterceptor = new FileInterceptor();

usersRouter.post(
  '/admin/register',
  fileInterceptor.singleFileStore('profilePic').bind(fileInterceptor),
  controller.create.bind(controller)
);
usersRouter.patch('/admin/login', controller.login.bind(controller));
