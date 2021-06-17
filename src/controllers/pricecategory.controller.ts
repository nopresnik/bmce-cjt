import code from 'http-status-codes';
import db from '../models';
import IController from '../types/IController';
import ApiResponse from '../utilities/apiResponse';

const createCategory: IController = async (req, res) => {
  try {
    const category = await db.PriceCategory.create(req.body);
    ApiResponse.result(res, category);
  } catch (e) {
    ApiResponse.error(res, code.BAD_REQUEST, e);
  }
};

const getCategories: IController = async (req, res) => {
  try {
    const categories = await db.PriceCategory.find({});
    ApiResponse.result(res, categories);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

export default { createCategory, getCategories };
