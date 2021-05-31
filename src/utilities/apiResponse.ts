import { Response } from 'express';
import httpStatusCodes from 'http-status-codes';

class ApiResponse {
  static result = (res: Response, data: unknown, status = 200): void => {
    res.status(status).json({ success: true, data });
  };

  static error = (res: Response, status = 400, error = httpStatusCodes.getStatusText(status)): void => {
    res.status(status).json({ success: false, error });
  };
}

export default ApiResponse;
