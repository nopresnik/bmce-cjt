import code from 'http-status-codes';
import { autoInjectable } from 'tsyringe';
import { Req, Res } from '../interfaces/req-res.interface';
import RouteInjection from '../interfaces/route-injection.interface';
import JobService from '../services/job.service';
import Job from '../types/IJob';
import JobStatus from '../types/IJobStatus';
import ApiResponse from '../utilities/apiResponse';
import BaseController from './base.controller';

@autoInjectable()
export class JobController extends BaseController<Job> {
  constructor(private readonly jobService: JobService) {
    super(jobService);
  }

  private createJob = async (req: Req, res: Res) => {
    try {
      const job = await this.jobService.create(req.body);
      ApiResponse.result(res, job);
    } catch (e) {
      ApiResponse.error(res, code.BAD_REQUEST, e);
    }
  };

  private findOneByJobID = async (req: Req, res: Res) => {
    try {
      const job = await this.jobService.findOneByJobID(parseFloat(req.params.id));
      if (job) return ApiResponse.result(res, job);
      return ApiResponse.error(res, code.NOT_FOUND);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  private findAllByStatus = async (req: Req, res: Res) => {
    try {
      const status = req.params.status.toUpperCase() as JobStatus;
      const jobs = await this.jobService.findAllByStatus(status);
      if (jobs) return ApiResponse.result(res, jobs);
      return ApiResponse.error(res, code.NOT_FOUND);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  private findAllUnpaid = async (req: Req, res: Res) => {
    try {
      const jobs = await this.jobService.findUnpaid();
      if (jobs) return ApiResponse.result(res, jobs);
      return ApiResponse.error(res, code.NOT_FOUND);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  private findAllAwaitingInvoicing = async (req: Req, res: Res) => {
    try {
      const jobs = await this.jobService.findAwaitingInvoicing();
      if (jobs) return ApiResponse.result(res, jobs);
      return ApiResponse.error(res, code.NOT_FOUND);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  private patchByJobID = async (req: Req, res: Res) => {
    try {
      const job = await this.jobService.patchByJobID(parseFloat(req.params.id), req.body);
      if (job) return ApiResponse.result(res, job);
      return ApiResponse.error(res, code.NOT_FOUND);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  private deleteByJobID = async (req: Req, res: Res) => {
    try {
      const job = await this.jobService.deleteJobByID(parseFloat(req.params.id));
      if (job) return ApiResponse.result(res, job);
      return ApiResponse.error(res, code.NOT_FOUND);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  private recoverByJobID = async (req: Req, res: Res) => {
    try {
      const job = await this.jobService.recoverJobByID(parseFloat(req.params.id));
      if (job) return ApiResponse.result(res, job);
      return ApiResponse.error(res, code.NOT_FOUND);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };

  // prettier-ignore
  public routeInjections: RouteInjection[] = [
    { method: 'post',   route: '/',            controller: this.createJob },
    { method: 'get',    route: '/',            controller: this.findAllByStatus },
    { method: 'get',    route: '/:id',         controller: this.findOneByJobID },
    { method: 'get',    route: '/s/unpaid',    controller: this.findAllUnpaid },
    { method: 'get',    route: '/s/invoicing', controller: this.findAllAwaitingInvoicing },
    { method: 'get',    route: '/s/:status',   controller: this.findAllByStatus },
    { method: 'patch',  route: '/:id',         controller: this.patchByJobID },
    { method: 'delete', route: '/:id',         controller: this.deleteByJobID },
    { method: 'post',   route: '/recover/:id', controller: this.recoverByJobID },
  ];
}
