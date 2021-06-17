import { Schema } from 'mongoose';
import PriceCategory from 'types/IPriceCategory';

const schema = new Schema<PriceCategory>(
  {
    description: { type: String, unique: true },
  },
  { timestamps: true },
);

export default schema;
