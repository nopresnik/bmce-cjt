import code from 'http-status-codes';
import db from '../models';
import IController from '../types/IController';
import ApiResponse from '../utilities/apiResponse';

const createClient: IController = async (req, res) => {
  try {
    const client = await db.Client.create(req.body);
    ApiResponse.result(res, client);
  } catch (e) {
    ApiResponse.error(res, code.BAD_REQUEST, e);
  }
};

const getAllClients: IController = async (req, res) => {
  try {
    const clients = await db.Client.find({});
    ApiResponse.result(res, clients);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const getClientByID: IController = async (req, res) => {
  const _id = req.params.clientID;
  try {
    const client = await db.Client.findOne({ _id });
    if (client) {
      return ApiResponse.result(res, client);
    }
    return ApiResponse.error(res, code.NOT_FOUND);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const patchClient: IController = async (req, res) => {
  const _id = req.params.clientID;
  try {
    const client = await db.Client.findOneAndUpdate({ _id }, req.body, { new: true, runValidators: true });
    return ApiResponse.result(res, client);
  } catch (e) {
    return ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

const deleteClient: IController = async (req, res) => {
  const _id = req.params.clientID;
  try {
    const client = await db.Client.findOneAndUpdate({ _id }, { deleted: true }, { new: true });
    return ApiResponse.result(res, client);
  } catch (e) {
    return ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

export default { createClient, getAllClients, getClientByID, patchClient, deleteClient };
