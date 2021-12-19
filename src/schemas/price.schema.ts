import { Schema } from 'mongoose';
import Price from '../types/IPrice';

export default new Schema<Price>(
  {
    description: { type: String, required: true },
    staff: { type: String, required: false },
    price: { type: Number, required: true },
  },
  {
    _id: false,
  },
);
