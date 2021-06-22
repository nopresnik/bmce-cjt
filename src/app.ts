import http from 'http';
import makeConnection from './models/connection';
import createServer from './server';
import sockets from './services/socket.service';

function startServer() {
  const port: number = parseInt(<string>process.env.PORT, 10) || 3001;
  const app = createServer();
  const server = http.createServer(app);

  makeConnection()
    .then(() => {
      server.listen(port, () => console.log(`Server running on port ${port}`));
      sockets.connect(server);
    })
    .catch(console.log);
}

startServer();
