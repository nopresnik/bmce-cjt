import code from 'http-status-codes';
import foldergen from '../helpers/foldergen';
import pusher from '../helpers/pusher';
import db from '../models';
import IController from '../types/IController';
import JobStatus from '../types/IJobStatus';
import ApiResponse from '../utilities/apiResponse';

const createJob: IController = async (req, res) => {
  try {
    const job = await db.Job.create(req.body);

    if (!job.previousRefs.length) {
      foldergen.makeJobFolder(job);
    }

    pusher.sendMsg('jobs', 'update_job', JSON.stringify(job));

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
    const jobs = await db.Job.find({ ...status, deleted: false })
      .sort({ _id: -1 })
      .populate('client');
    ApiResponse.result(res, jobs);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const getUnpaidJobs: IController = async (req, res) => {
  try {
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
    const jobs = await db.Job.aggregate(aggregate).sort({ _id: -1 });
    ApiResponse.result(res, jobs);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const getInvoicingJobs: IController = async (req, res) => {
  try {
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
    const jobs = await db.Job.aggregate(aggregate).sort({ _id: -1 });
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
    pusher.sendMsg('jobs', 'update_job', JSON.stringify(job));
    return ApiResponse.result(res, job);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const deleteJob: IController = async (req, res) => {
  const jobID = parseInt(req.params.jobID);
  try {
    const job = await db.Job.findOneAndUpdate({ jobID }, { deleted: true }, { new: true });
    pusher.sendMsg('jobs', 'update_job', JSON.stringify(job));
    ApiResponse.result(res, job);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const recoverJob: IController = async (req, res) => {
  const jobID = parseInt(req.params.jobID);
  try {
    const job = await db.Job.findOneAndUpdate({ jobID }, { deleted: false }, { new: true });
    pusher.sendMsg('jobs', 'update_job', JSON.stringify(job));
    ApiResponse.result(res, job);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

export default { createJob, getAllJobs, getInvoicingJobs, getUnpaidJobs, getJobById, patchJob, deleteJob, recoverJob };
