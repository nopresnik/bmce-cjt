import { autoInjectable } from 'tsyringe';
import UserService from '../services/user.service';
import User from '../types/IUser';
import BaseController from './base.controller';

@autoInjectable()
export class UserController extends BaseController<User> {
  constructor(userService: UserService) {
    super(userService);
  }
}
