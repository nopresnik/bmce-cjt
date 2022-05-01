import { Schema } from 'mongoose';
import RegisterEntry from '../types/RegisterEntry';

export default new Schema<RegisterEntry>(
  {
    registerName: { type: String, required: true },
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    received: { type: Date, required: true },
    expectedCompletion: { type: Date, required: true },
    comments: { type: String },
  },
  { timestamps: true },
);
