import db from '../models';
import JobModel from '../models/job.model';

const getNextJobID = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    JobModel.find()
      .limit(1)
      .sort({ jobID: -1 })
      .then((result) => {
        if (result.length) {
          const nextID = Math.floor(result[0]['jobID'] + 1);
          resolve(nextID);
        }

        resolve(1);
      })
      .catch((e) => reject(e));
  });
};

export default { getNextJobID };
