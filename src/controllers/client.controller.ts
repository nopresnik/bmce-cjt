import code from 'http-status-codes';
import db from '../models';
import IController from '../types/IController';
import ApiResponse from '../utilities/apiResponse';

const getAllClients: IController = async (req, res) => {
  try {
    const clients = await db.Client.find({});
    ApiResponse.result(res, clients);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const createClient: IController = async (req, res) => {
  try {
    const client = await db.Client.create(req.body);
    ApiResponse.result(res, client);
  } catch (e) {
    ApiResponse.error(res, code.BAD_REQUEST, e);
  }
};

export default { getAllClients, createClient };
