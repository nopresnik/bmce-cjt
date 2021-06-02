import code from 'http-status-codes';
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
    const jobs = await db.Job.find({}).populate('client');
    ApiResponse.result(res, jobs);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const getJobById: IController = async (req, res) => {
  try {
    const job = await db.Job.findOne({ jobID: parseInt(req.params.jobID) });

    if (job) {
      return ApiResponse.result(res, job);
    }
    return ApiResponse.error(res, code.NOT_FOUND);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const updateJob: IController = async (req, res) => {
  const jobID = parseInt(req.params.jobID);
  try {
    const job = await db.Job.findOneAndUpdate({ jobID }, req.body);
    return ApiResponse.result(res, job);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

export default { createJob, getAllJobs, getJobById, updateJob };
