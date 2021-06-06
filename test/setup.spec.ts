import * as db from 'database';

const uri = 'mongodb://localhost/bmcjt-test';

before(async () => {
  await db.connect(uri);
});

after(async () => {
  await db.disconnect();
});
