import makeConnection from './models/connection';
import createServer from './server';

function startServer() {
  const port: number = parseInt(<string>process.env.PORT, 10) || 3000;
  const app = createServer();

  makeConnection()
    .then(() => {
      app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(console.log);
}

const message = 'test';

console.log(message);

startServer();
