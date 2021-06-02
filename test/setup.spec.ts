import makeConnection from 'models/connection';

const uri = 'mongodb://localhost/bmcjt-test';

before((done) => {
  makeConnection(uri).then(() => done());
});

after((done) => {
  makeConnection(uri).then((db) => {
    db.connection.db.dropDatabase(() => done());
  });
});
