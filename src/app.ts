import http from 'http';
import makeConnection from './models/connection';
import createServer from './server';

function startServer() {
  const port: number = parseInt(<string>process.env.PORT, 10) || 3001;
  const app = createServer();
  const server = http.createServer(app);

  makeConnection()
    .then(() => {
      server.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(console.log);
}

startServer();
