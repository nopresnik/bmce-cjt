import code from 'http-status-codes';
import db from '../models';
import IController from '../types/IController';
import ApiResponse from '../utilities/apiResponse';

const getAllUsers: IController = async (req, res) => {
  try {
    const users = await db.User.find({}).sort({ initials: 1 });
    ApiResponse.result(res, users);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const createUser: IController = async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    ApiResponse.result(res, user);
  } catch (e) {
    ApiResponse.error(res, code.BAD_REQUEST, e);
  }
};

export default { getAllUsers, createUser };
