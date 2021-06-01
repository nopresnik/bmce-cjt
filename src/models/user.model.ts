import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface User {
  name: string;
  email: string;
  password: string;
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

schema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

const UserModel = model<User>('User', schema);

export default UserModel;
