import { autoInjectable } from 'tsyringe';
import ClientService from '../services/client.service';
import Client from '../types/IClient';
import BaseController from './base.controller';

@autoInjectable()
export class ClientController extends BaseController<Client> {
  constructor(clientService: ClientService) {
    super(clientService);
  }
}
