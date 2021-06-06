import createServer from './server';
import * as db from './database';

function startServer() {
  const port: number = parseInt(<string>process.env.PORT, 10) || 3001;
  const app = createServer();

  db.connect()
    .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
    .catch(console.log);
}

startServer();
