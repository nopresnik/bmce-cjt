import { Request, Response } from 'express';

export default interface RouteInjection {
  method: 'delete' | 'get' | 'patch' | 'post' | 'put';
  route: string;
  controller: (req: Request, res: Response) => void;
}
