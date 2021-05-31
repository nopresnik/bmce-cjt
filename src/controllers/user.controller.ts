import ApiResponse from '../utilities/apiResponse';
import db from '../models';
import IController from '../types/IController';

const getAllUsers: IController = async (req, res) => {
  try {
    const users = await db.User.find({});
    ApiResponse.result(res, users);
  } catch (e) {
    res.json(e);
  }
};

export default { getAllUsers };
