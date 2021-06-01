import { Schema } from 'mongoose';
import Address from './IAddress';
import JobStatus from './IJobStatus';
import Price from './IPrice';

export default interface Job {
  jobID: number;
  date: Date;
  client: Schema.Types.ObjectId;
  location: Address;
  desription: string;
  notes: string;
  previousRefs: [number];
  pricing: [Price];
  status: JobStatus;
  dateCompleted: Date;
  invoiced: boolean;
  invoicePaid: boolean;
  purchaseOrder: string;
  completedBy: string;
}
