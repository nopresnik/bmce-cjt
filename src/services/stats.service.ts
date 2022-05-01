import { DateTime } from 'luxon';
import { injectable } from 'tsyringe';
import JobModel from '../models/job.model';
import JobStatus from '../types/IJobStatus';
import Stats from '../types/IStats';

@injectable()
export default class StatsService {
  private readonly jobsModel = JobModel;

  public async getStats(): Promise<Stats> {
    const statsObject: Stats = {
      active: 0,
      hold: 0,
      awaitingInvoicing: 0,
      unpaid: 0,
      month: 0,
      year: 0,
    };

    try {
      statsObject.active = await this.jobsModel.countDocuments({ status: JobStatus.Active, deleted: false });

      statsObject.hold = await this.jobsModel.countDocuments({ status: JobStatus.Hold, deleted: false });

      statsObject.awaitingInvoicing = await this.jobsModel.countDocuments({
        status: JobStatus.Completed,
        invoiced: false,
        invoicePaid: false,
        deleted: false,
      });

      statsObject.unpaid = await this.jobsModel.countDocuments({ invoiced: true, invoicePaid: false, deleted: false });

      statsObject.month = await this.jobsModel.countDocuments({
        date: {
          $gte: DateTime.now().startOf('month').toJSDate(),
          $lt: DateTime.now().endOf('month').toJSDate(),
        },
        deleted: false,
      });

      statsObject.year = await this.jobsModel.countDocuments({
        date: {
          $gte: DateTime.now().startOf('year').toJSDate(),
          $lt: DateTime.now().endOf('year').toJSDate(),
        },
        deleted: false,
      });

      return statsObject;
    } catch (e) {
      throw new Error('Could not get stats');
    }
  }
}
