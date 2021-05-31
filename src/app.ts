import createServer from './server';

function startServer() {
  const port: number = parseInt(<string>process.env.PORT, 10) || 3000;
  const app = createServer();

  app.listen(port, () => console.log(`Server running on port ${port}`));
}

startServer();
