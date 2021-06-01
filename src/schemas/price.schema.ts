import { Schema } from 'mongoose';
import Price from '../types/IPrice';

export default new Schema<Price>(
  {
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    _id: false,
  },
);
