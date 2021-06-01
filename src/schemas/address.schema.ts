import { Schema } from 'mongoose';
import IAddress from '../types/IAddress';

export default new Schema<IAddress>(
  {
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    postcode: { type: String },
  },
  { _id: false },
);
