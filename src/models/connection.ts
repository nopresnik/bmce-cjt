import mongoose, { Mongoose } from 'mongoose';

function makeConnection(uri: string = <string>process.env.MONGO_URI): Promise<Mongoose> {
  return mongoose.connect(uri || 'mongodb://localhost/bmcjt', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

export default makeConnection;
