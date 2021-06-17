import code from 'http-status-codes';
import IController from '../types/IController';
import Stats from '../types/IStats';
import ApiResponse from '../utilities/apiResponse';

const getStats: IController = async (req, res) => {
  const statsObject: Stats = {
    active: 0,
    hold: 0,
    awaitingInvoicing: 0,
    unpaid: 0,
    month: 0,
    year: 0,
  };

  try {
    statsObject.active = 5;
    statsObject.hold = 6;
    statsObject.awaitingInvoicing = 7;
    statsObject.unpaid = 8;
    statsObject.month = 9;
    statsObject.year = 10;

    ApiResponse.result(res, statsObject);
  } catch (e) {
    ApiResponse.error(res, code.INTERNAL_SERVER_ERROR, e);
  }
};

export default { getStats };
