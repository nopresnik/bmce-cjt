import { injectable } from 'tsyringe';
import UserModel from '../models/user.model';
import User from '../types/IUser';
import BaseService from './base.service';

@injectable()
export default class UserService extends BaseService<User> {
  constructor() {
    super(UserModel);
  }
}
