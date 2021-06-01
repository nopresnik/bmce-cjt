import db from '../models';

const getNextJobID = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.Job.find()
      .limit(1)
      .sort({ $natural: -1 })
      .then((result) => {
        if (result.length) {
          const nextID = result[0]['jobID'] + 1;
          resolve(nextID);
        }

        resolve(1);
      })
      .catch((e) => reject(e));
  });
};

export default { getNextJobID };
