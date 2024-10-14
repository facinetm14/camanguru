import { createServer, IncomingMessage, ServerResponse } from 'http';
import { App } from './src/app';

const hostname = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

const server = createServer((req: IncomingMessage, resp: ServerResponse) => {
 const app = new App(req, resp);
  app.run();
});

server.listen(+port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});