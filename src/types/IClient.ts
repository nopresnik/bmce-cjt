import IAddress from './IAddress';

export default interface Client {
  name: string;
  address: IAddress;
  email: string;
  mobile: string;
  phone: string;
  notes: string;
  deleted: boolean;
}
