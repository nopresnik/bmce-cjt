import { Schema } from 'mongoose';
import Address from './IAddress';

export default interface Job {
  jobID: number;
  client: Schema.Types.ObjectId;
  location: Address;
}
