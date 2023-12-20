import { NextFunction, Request, Response } from 'express';
import { Repository } from '../repo/repo.js';
import { MediaFiles } from '../services/media.file.js';

export abstract class Controller<T extends { id: unknown }> {
  cloudinaryService: MediaFiles;

  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: Repository<T>) {
    this.cloudinaryService = new MediaFiles();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.create(req.body);
      res.status(200);
      res.statusMessage = 'Ok';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.update(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repo.delete(req.params.id);
      res.status(204);
      res.statusMessage = 'No content';
      res.json({});
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.getById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
