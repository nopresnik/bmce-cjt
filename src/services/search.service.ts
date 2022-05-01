import { FilterQuery } from 'mongoose';
import { injectable } from 'tsyringe';
import JobModel from '../models/job.model';
import Job from '../types/IJob';

@injectable()
export default class SearchService {
  private readonly jobModel = JobModel;

  public results = (query: FilterQuery<Job>, only: string[]): Promise<Job[]> => {
    return this.jobModel.find(query, only).sort({ _id: -1 }).exec();
  };
}
