import { Model } from 'mongoose';
import { injectable } from 'tsyringe';
import ClientModel from '../models/client.model';
import Client from '../types/IClient';
import BaseService from './base.service';

@injectable()
export default class ClientService extends BaseService<Client> {
  private clientModel: Model<Client> = ClientModel;

  constructor() {
    super(ClientModel);
  }

  // TODO: REMOVE THIS AND USE GENERIC DELETE WHEN IMPLEMENTED
  public delete = async (id: string): Promise<Client | null> => {
    return this.clientModel.findByIdAndUpdate(id, { deleted: true }, { new: true }).exec();
  };
}
