import ApiResponse from '../utilities/apiResponse';
import db from '../models';
import IController from '../types/IController';
import code from 'http-status-codes';

const getAllUsers: IController = async (req, res) => {
  try {
    const users = await db.User.find({});
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
