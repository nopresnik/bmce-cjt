import { Router } from 'express';

export default interface Controller {
  routes(): Router;
}
