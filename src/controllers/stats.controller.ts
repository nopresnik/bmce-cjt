import { Request, Response, Router } from 'express';
import code from 'http-status-codes';
import { autoInjectable } from 'tsyringe';
import Controller from '../interfaces/controller.interface';
import StatsService from '../services/stats.service';
import ApiResponse from '../utilities/apiResponse';

@autoInjectable()
export class StatsController implements Controller {
  private router = Router();

  constructor(private readonly statsService: StatsService) {}

  public getStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const stats = await this.statsService.getStats();
      ApiResponse.result(res, stats);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  routes(): Router {
    this.router.get('/', this.getStats);

    return this.router;
  }
}
