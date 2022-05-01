import { injectable } from 'tsyringe';
import RegisterEntryModel from '../models/registerentry.model';
import RegisterEntry from '../types/RegisterEntry';
import BaseService from './base.service';

@injectable()
export default class RegisterService extends BaseService<RegisterEntry> {
  private readonly registerModel = RegisterEntryModel;

  constructor() {
    super(RegisterEntryModel);
  }

  public findAll = (registerName?: string): Promise<RegisterEntry[]> => {
    return this.registerModel.find({ registerName }).exec();
  };
}
