import { Schema } from 'mongoose';
import Client from '../types/IClient';
import addressSchema from './address.schema';

export default new Schema<Client>(
  {
    name: { type: String, required: true },
    address: { type: addressSchema, required: true },
  },
  { timestamps: true },
);
