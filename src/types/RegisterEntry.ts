import { Schema } from 'mongoose';

export default interface RegisterEntry {
  registerName: string;
  job: Schema.Types.ObjectId;
  received: Date;
  expectedCompletion: Date;
  comments?: string;
}
