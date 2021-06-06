import makeConnection from 'models/connection';

const uri = 'mongodb://localhost/bmcjt-test';

before((done) => {
  makeConnection(uri).then(() => done());
});

after(async () => {
  const db = await makeConnection(uri);
  await db.connection.db.dropDatabase();
  await db.connection.close();
  await db.disconnect();

  // makeConnection(uri).then((db) => {
  //   db.connection.db.dropDatabase(() => {
  //     db.connection.close().then(() => {
  //       db.disconnect().then(() => done());
  //     });
  //   });
  // });
});
