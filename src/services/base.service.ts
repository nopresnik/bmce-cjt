import { Model } from 'mongoose';
import Service from '../interfaces/service.interface';

export default class BaseService<T> implements Service<T> {
  constructor(private readonly model: Model<T>) {}

  public create = async (item: T): Promise<T> => {
    return this.model.create(item);
  };

  public findAll = async (): Promise<T[]> => {
    return this.model.find({}).exec();
  };

  public findOne = async (id: string): Promise<T | null> => {
    return this.model.findById(id).exec();
  };

  public patch = async (id: string, item: T): Promise<T | null> => {
    return this.model.findByIdAndUpdate(id, item, { new: true, runValidators: true }).exec();
  };

  // TODO: FIX THIS GENERIC PROBLEM
  // public delete = async (id: string): Promise<T | null> => {
  //   return this.model.findByIdAndUpdate(id, { deleted: true }, { new: true }).exec();
  // };
  delete(id: string): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
}
