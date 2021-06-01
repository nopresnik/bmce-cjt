import { Schema } from 'mongoose';
import IAddress from '../types/IAddress';

const schema = new Schema<IAddress>({
  line1: { type: String },
  line2: { type: String },
  city: { type: String },
  state: { type: String },
  postcode: { type: String },
});

export default schema;
