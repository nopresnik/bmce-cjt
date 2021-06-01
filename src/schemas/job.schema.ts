import { Schema } from 'mongoose';
import Job from '../types/IJob';
import jobUtilities from '../utilities/jobUtilities';
import addressSchema from './address.schema';
import priceSchema from './price.schema';

const schema = new Schema<Job>(
  {
    jobID: { type: Number, unique: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    location: { type: addressSchema, required: true },
    pricing: { type: [priceSchema] },
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
