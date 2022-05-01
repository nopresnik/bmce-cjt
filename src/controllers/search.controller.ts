import { Request, Response, Router } from 'express';
import { DateTime } from 'luxon';
import { FilterQuery } from 'mongoose';
import { autoInjectable } from 'tsyringe';
import Controller from '../interfaces/controller.interface';
import SearchService from '../services/search.service';
import Job from '../types/IJob';
import JobStatus from '../types/IJobStatus';
import ApiResponse from '../utilities/apiResponse';

@autoInjectable()
export class SearchController implements Controller {
  private readonly router = Router();

  constructor(private readonly searchService: SearchService) {}

  public getResults = async (req: Request, res: Response): Promise<void> => {
    const only = (req.query.only as string)?.split(',');
    const { start, end, rangeByCompleted, status, invoiced, invoicePaid, pricedBy } = req.query;

    const query: FilterQuery<Job> = {};
    if (start) {
      const date = DateTime.fromISO(start.toString()).startOf('day').toJSDate();
      rangeByCompleted === 'true' ? (query.dateCompleted = { $gte: date }) : (query.date = { $gte: date });
    }
    if (end) {
      const date = DateTime.fromISO(end.toString()).endOf('day').toJSDate();
      rangeByCompleted === 'true'
        ? (query.dateCompleted = { ...query.dateCompleted, $lte: date })
        : (query.date = { ...query.date, $lte: date });
    }
    if (status) {
      query.status = status.toString().toUpperCase() as JobStatus;
    }
    if (invoiced) {
      query.invoiced = invoiced === 'true';
    }
    if (invoicePaid) {
      query.invoicePaid = invoicePaid === 'true';
    }
    if (pricedBy) {
      query['pricing.staff'] = { $all: (pricedBy as string).split(',') };
    }

    try {
      const results = await this.searchService.results(query, only);
      ApiResponse.result(res, results);
    } catch (e) {
      ApiResponse.error(res, 500, e);
    }
  };

  routes(): Router {
    this.router.get('/', this.getResults);

    return this.router;
  }
}
