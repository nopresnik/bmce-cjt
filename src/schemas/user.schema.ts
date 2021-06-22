import bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';
import User from '../types/IUser';

const schema = new Schema<User>(
  {
    name: { type: String, required: true },
    initials: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

schema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });

  if (!this.initials) {
    const name = this.name.split(' ');
    const initials = name.shift().charAt(0) + name.pop().charAt(0);
    this.initials = initials;
  }
});

export default schema;
