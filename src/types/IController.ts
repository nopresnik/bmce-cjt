import { Request, Response } from 'express';

interface IController {
  (req: Request, res: Response): void;
}

export default IController;
