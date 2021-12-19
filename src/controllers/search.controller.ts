import { DateTime } from 'luxon';
import db from 'models';
import { FilterQuery } from 'mongoose';
import IController from 'types/IController';
import Job from 'types/IJob';
import JobStatus from 'types/IJobStatus';
import ApiResponse from 'utilities/apiResponse';

const searchJobs: IController = async (req, res) => {
  const only = (req.query.only as string)?.split(',');

  const { start, end, status, invoiced, invoicePaid } = req.query;

  const query: FilterQuery<Job> = {};
  if (start) {
    const date = DateTime.fromISO(start.toString()).startOf('day').toJSDate();
    query.date = { $gte: date };
  }
  if (end) {
    const date = DateTime.fromISO(end.toString()).endOf('day').toJSDate();
    query.date = { ...query.date, $lte: date };
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

  const jobs = await db.Job.find(query, only).sort({
    _id: -1,
  });

  return ApiResponse.result(res, { jobs });
};

export default { searchJobs };
