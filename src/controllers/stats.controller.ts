import code from 'http-status-codes';
import { DateTime } from 'luxon';
import db from '../models';
import IController from '../types/IController';
import JobStatus from '../types/IJobStatus';
import Stats from '../types/IStats';
import ApiResponse from '../utilities/apiResponse';

const getStats: IController = async (req, res) => {
  const statsObject: Stats = {
    active: 0,
    hold: 0,
    awaitingInvoicing: 0,
    unpaid: 0,
    month: 0,
    year: 0,
  };

  try {
    const date = new Date();

    statsObject.active = await db.Job.countDocuments({ status: JobStatus.Active, deleted: false });

    statsObject.hold = await db.Job.countDocuments({ status: JobStatus.Hold, deleted: false });

    statsObject.awaitingInvoicing = await db.Job.countDocuments({
      status: JobStatus.Completed,
      invoiced: false,
      invoicePaid: false,
      deleted: false,
    });

    statsObject.unpaid = await db.Job.countDocuments({ invoiced: true, invoicePaid: false, deleted: false });

    statsObject.month = await db.Job.countDocuments({
      date: {
        $gte: new DateTime().startOf('month').toJSDate(),
        $lt: new DateTime().endOf('month').toJSDate(),
      },
      deleted: false,
    });

    statsObject.year = await db.Job.countDocuments({
      date: {
        $gte: new DateTime().startOf('year').toJSDate(),
        $lt: new DateTime().endOf('year').toJSDate(),
      },
      deleted: false,
    });

    ApiResponse.result(res, statsObject);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

export default { getStats };
