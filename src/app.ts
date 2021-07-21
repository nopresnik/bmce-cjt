import makeConnection from './models/connection';
import createServer from './server';

function startServer() {
  const port: number = parseInt(<string>process.env.PORT, 10) || 3001;
  const app = createServer();

  makeConnection()
    .then(() => {
      app.listen(port, () => console.log(`Server running on port ${port}`));
      console.log(process.env);
    })
    .catch(console.log);
}

startServer();
