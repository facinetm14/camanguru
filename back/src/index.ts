import { createServer, IncomingMessage, ServerResponse } from 'http';

const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 5000;

const server = createServer((req: IncomingMessage, resp: ServerResponse) => {
  resp.statusCode = 200;
  resp.setHeader('Content-Type', 'text/plain');
  console.log('Request received');
  resp.end('Hello World\n');
});

server.listen(+port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});