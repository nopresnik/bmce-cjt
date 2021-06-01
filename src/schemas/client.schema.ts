import { Schema } from 'mongoose';
import Client from '../types/IClient';
import addressSchema from './address.schema';

export default new Schema<Client>(
  {
    name: { type: String, required: true },
    address: { type: addressSchema, required: true },
    email: { type: String },
    mobile: { type: String },
    phone: { type: String },
    notes: { type: String },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);
