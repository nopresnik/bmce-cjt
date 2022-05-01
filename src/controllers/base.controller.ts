import { Router, Request, Response } from 'express';
import code from 'http-status-codes';
import Controller from '../interfaces/controller.interface';
import RouteInjection from '../interfaces/route-injection.interface';
import Service from '../interfaces/service.interface';
import ApiResponse from '../utilities/apiResponse';

export default class BaseController<T> implements Controller {
  private router = Router({ mergeParams: true });

  constructor(private readonly service: Service<T>) {}

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.create(req.body);
      ApiResponse.result(res, item);
    } catch (e) {
      ApiResponse.error(res, code.BAD_REQUEST, e);
    }
  };

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.service.findAll();
      ApiResponse.result(res, items);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  public findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.findOne(req.params.id);
      if (item) return ApiResponse.result(res, item);
      return ApiResponse.error(res, code.NOT_FOUND);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  public patch = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.patch(req.params.id, req.body);
      if (item) return ApiResponse.result(res, item);
      return ApiResponse.error(res, code.NOT_FOUND);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.delete(req.params.id);
      if (item) return ApiResponse.result(res, item);
      return ApiResponse.error(res, code.NOT_FOUND);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  public routeInjections: RouteInjection[] = [];

  public routes = (): Router => {
    if (this.routeInjections.length) {
      this.routeInjections.forEach(({ method, route, controller }) => {
        this.router[method](route, controller);
      });
    }

    this.router.post('/', this.create);
    this.router.get('/', this.findAll);
    this.router.get('/:id', this.findOne);
    this.router.patch('/:id', this.patch);
    this.router.delete('/:id', this.delete);

    return this.router;
  };
}
