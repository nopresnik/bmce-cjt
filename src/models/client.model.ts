import { model } from 'mongoose';
import clientSchema from '../schemas/client.schema';
import Client from '../types/IClient';

const ClientModel = model<Client>('Client', clientSchema);

export default ClientModel;

export class ClientModelClass {
  public model = model<Client>('Client', clientSchema);
}
