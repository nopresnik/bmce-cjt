import { model } from 'mongoose';
import registerEntrySchema from '../schemas/registerentry.schema';
import RegisterEntry from '../types/RegisterEntry';

const RegisterEntryModel = model<RegisterEntry>('RegisterEntry', registerEntrySchema);

export default RegisterEntryModel;
