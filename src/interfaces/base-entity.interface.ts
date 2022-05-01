import { Model } from 'mongoose';

export interface BaseEntity<T> extends Model<T> {
  deleted: boolean;
}
