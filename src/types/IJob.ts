import Address from './IAddress';

export default interface Job {
  jobID: number;
  name: string;
  location: Address;
}
