import { Schema } from 'mongoose';
import Job from '../types/IJob';
import jobUtilities from '../utilities/jobUtilities';

const schema = new Schema<Job>(
  {
    jobID: { type: Number, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

schema.pre('save', async function (next) {
  if (!this.jobID) {
    const jobID = await jobUtilities.getNextJobID();
    this.jobID = jobID;
  }
  next();
});

export default schema;
