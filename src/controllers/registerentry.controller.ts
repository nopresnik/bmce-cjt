import { Request, Response } from 'express';
import code from 'http-status-codes';
import { autoInjectable } from 'tsyringe';
import RegisterService from '../services/register.service';
import RegisterEntry from '../types/RegisterEntry';
import ApiResponse from '../utilities/apiResponse';
import BaseController from './base.controller';

@autoInjectable()
export class RegisterController extends BaseController<RegisterEntry> {
  constructor(private readonly registerService: RegisterService) {
    super(registerService);
  }

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const registerEntries = await this.registerService.findAll(req.params.registerName);
      ApiResponse.result(res, registerEntries);
    } catch (e) {
      ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
    }
  };
}
