import code from 'http-status-codes';
import db from '../models';
import IController from '../types/IController';
import ApiResponse from '../utilities/apiResponse';

const getAllJobs: IController = async (req, res) => {
  try {
    const jobs = await db.Job.find({}).populate('client');
    ApiResponse.result(res, jobs);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const createJob: IController = async (req, res) => {
  try {
    const job = await db.Job.create(req.body);
    ApiResponse.result(res, job);
  } catch (e) {
    ApiResponse.error(res, code.BAD_REQUEST, e);
  }
};

export default { getAllJobs, createJob };
