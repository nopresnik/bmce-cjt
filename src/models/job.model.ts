import { model } from 'mongoose';
import jobSchema from '../schemas/job.schema';
import Job from '../types/IJob';

const JobModel = model<Job>('Job', jobSchema);

export default JobModel;
