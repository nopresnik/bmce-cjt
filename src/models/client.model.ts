import { model, Schema } from 'mongoose';
import IAddress from '../types/IAddress';
import addressSchama from '../schemas/address.schema';

export interface Client {
  name: string;
  address: IAddress;
}

const schema = new Schema<Client>({
  name: { type: String, required: true },
  address: { type: addressSchama, required: true },
});

const ClientModel = model<Client>('Client', schema);

export default ClientModel;
