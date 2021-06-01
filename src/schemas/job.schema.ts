import { Schema } from 'mongoose';
import Job from '../types/IJob';
import JobStatus from '../types/IJobStatus';
import jobUtilities from '../utilities/jobUtilities';
import addressSchema from './address.schema';
import priceSchema from './price.schema';

const schema = new Schema<Job>(
  {
    jobID: { type: Number, unique: true },
    date: { type: Date, default: Date.now },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    location: { type: addressSchema, required: true },
    description: { type: String },
    notes: { type: String },
    previousRefs: { type: [Number] },
    pricing: { type: [priceSchema] },
    status: { type: String, enum: Object.values(JobStatus), default: JobStatus.Active },
    dateCompleted: { type: Date },
    invoiced: { type: Boolean, default: false },
    invoicePaid: { type: Boolean, default: false },
    purchaseOrder: { type: String },
    completedBy: { type: String },
  },
  { timestamps: true },
);

schema.pre('save', async function (next) {
  if (!this.jobID) {
    const jobID: number = await jobUtilities.getNextJobID();
    this.jobID = jobID;
  }
  next();
});

export default schema;
