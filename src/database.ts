import mongoose from 'mongoose';

export const connect = (uri: string = <string>process.env.MONGO_URI): Promise<mongoose.Mongoose> => {
  return new Promise(function (resolve, reject) {
    return mongoose.connect(
      uri || 'mongodb://localhost/bmcjt',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        poolSize: 10,
        useFindAndModify: true,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Successfully connected to database!');
          resolve(mongoose);
        }
      },
    );
  });
};

export const disconnect = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    await mongoose.connection.db.dropDatabase();
    return await mongoose.disconnect();
  } else {
    return mongoose.disconnect();
  }
};

export default mongoose;
