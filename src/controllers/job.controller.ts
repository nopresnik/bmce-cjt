import code from 'http-status-codes';
import JobStatus from 'types/IJobStatus';
import db from '../models';
import IController from '../types/IController';
import ApiResponse from '../utilities/apiResponse';

const createJob: IController = async (req, res) => {
  try {
    const job = await db.Job.create(req.body);
    ApiResponse.result(res, job);
  } catch (e) {
    ApiResponse.error(res, code.BAD_REQUEST, e);
  }
};

const getAllJobs: IController = async (req, res) => {
  try {
    let status = {};
    if (req.params.status) {
      switch (req.params.status.toLowerCase()) {
        default:
          status = { status: req.params.status.toUpperCase() };
      }
    }
    const jobs = await db.Job.find(status).sort({ _id: -1 }).populate('client');
    ApiResponse.result(res, jobs);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const getUnpaidJobs: IController = async (req, res) => {
  try {
    const aggregate = [
      { $match: { invoiced: true, invoicePaid: false } },
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
    const jobs = await db.Job.aggregate(aggregate).sort({ _id: -1 });
    ApiResponse.result(res, jobs);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const getInvoicingJobs: IController = async (req, res) => {
  try {
    const find = { invoiced: false, status: JobStatus.Completed };
    const jobs = await db.Job.find(find).sort({ _id: -1 }).populate('client');
    ApiResponse.result(res, jobs);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const getJobById: IController = async (req, res) => {
  try {
    const job = await db.Job.findOne({ jobID: parseInt(req.params.jobID) }).populate('client');

    if (job) {
      return ApiResponse.result(res, job);
    }
    return ApiResponse.error(res, code.NOT_FOUND);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const patchJob: IController = async (req, res) => {
  const jobID = parseInt(req.params.jobID);
  try {
    const job = await db.Job.findOneAndUpdate({ jobID }, req.body, { new: true, runValidators: true });
    return ApiResponse.result(res, job);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const deleteJob: IController = async (req, res) => {
  const jobID = parseInt(req.params.jobID);
  try {
    const job = await db.Job.findOneAndUpdate({ jobID }, { deleted: true }, { new: true });
    ApiResponse.result(res, job);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

export default { createJob, getAllJobs, getInvoicingJobs, getUnpaidJobs, getJobById, patchJob, deleteJob };
