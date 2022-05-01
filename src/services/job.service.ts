import { FilterQuery, Model } from 'mongoose';
import { injectable } from 'tsyringe';
import JobModel from '../models/job.model';
import Job from '../types/IJob';
import JobStatus from '../types/IJobStatus';
import BaseService from './base.service';

@injectable()
export default class JobService extends BaseService<Job> {
  private readonly jobModel: Model<Job> = JobModel;

  constructor() {
    super(JobModel);
  }

  public create = async (job: Job, prevRef?: number): Promise<Job> => {
    if (prevRef) {
      const prevJobs = await this.jobModel.countDocuments({ jobID: { $gte: prevRef, $lt: prevRef + 1 } });
      job.jobID = prevRef + prevJobs * 0.1;
    }

    // TODO: CREATE AND CALL FOLDER GEN SERVICE

    // TODO: CREATE AND CALL SOCKET SERVICE
    return this.jobModel.create(job);
  };

  public findOneByJobID = (jobId: number): Promise<Job | null> => {
    return this.jobModel.findOne({ jobID: jobId }).populate('client').exec();
  };

  public findAllByStatus = (status?: JobStatus): Promise<Job[]> => {
    const filter: FilterQuery<Job> = { deleted: false };
    if (status) filter.status = status;

    return this.jobModel.find(filter).sort({ _id: -1 }).populate('client').exec();
  };

  public findUnpaid = (): Promise<Job[]> => {
    const aggregate = [
      { $match: { invoiced: true, invoicePaid: false, deleted: false } },
      {
        $lookup: {
          from: 'clients',
          localField: 'client',
          foreignField: '_id',
          as: 'client',
        },
      },
      { $unwind: '$client' },
      { $addFields: { totalPrice: { $sum: '$pricing.price' } } },
    ];

    return this.jobModel.aggregate(aggregate).sort({ _id: -1 }).exec();
  };

  public findAwaitingInvoicing = (): Promise<Job[]> => {
    const aggregate = [
      { $match: { invoiced: false, status: JobStatus.Completed, deleted: false } },
      {
        $lookup: {
          from: 'clients',
          localField: 'client',
          foreignField: '_id',
          as: 'client',
        },
      },
      { $unwind: '$client' },
      { $addFields: { totalPrice: { $sum: '$pricing.price' } } },
    ];

    return this.jobModel.aggregate(aggregate).sort({ _id: -1 }).exec();
  };

  public patchByJobID = async (jobId: number, job: Job): Promise<Job | null> => {
    // TODO: CREATE AND CALL SOCKET SERVICE
    return this.jobModel.findOneAndUpdate({ jobID: jobId }, job, { new: true, runValidators: true }).exec();
  };

  public deleteJobByID = async (jobID: number): Promise<Job | null> => {
    // TODO: CREATE AND CALL SOCKET SERVICE
    return this.jobModel.findOneAndUpdate({ jobID }, { deleted: true }, { new: true });
  };

  public recoverJobByID = async (jobID: number): Promise<Job | null> => {
    // TODO: CREATE AND CALL SOCKET SERVICE
    return this.jobModel.findOneAndUpdate({ jobID }, { deleted: false }, { new: true });
  };
}
