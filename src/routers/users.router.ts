import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repo/users/users.mongo.repo.js';
import { UsersController } from '../controllers/users.controller.js';

const debug = createDebug('AB:tasks:router');

export const usersRouter = createRouter();
debug('Starting Users Router');

const repo = new UsersMongoRepo();
const controller = new UsersController(repo);

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.post('/admin/register', controller.create.bind(controller));
usersRouter.patch('/admin/login', controller.login.bind(controller));
