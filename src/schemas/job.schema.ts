import { Schema } from 'mongoose';
import Job from '../types/IJob';

export default new Schema<Job>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);
