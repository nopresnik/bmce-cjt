import { model } from 'mongoose';
import userSchema from '../schemas/user.schema';
import User from '../types/IUser';

const UserModel = model<User>('User', userSchema);

export default UserModel;
