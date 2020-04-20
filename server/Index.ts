import Next from 'next';
import express from 'express';
import configureRoutes from './routes/configureRoutes';


async function bootstrap() {
  const next = Next({ dev: process.env.NODE_ENV === 'development', dir: '.' });

  await next.prepare();

  const server = express();

  configureRoutes(server);

  const handle = next.getRequestHandler();

  server.get('*', (req, res) => handle(req, res));

  await server.listen(process.env.PORT);
}

bootstrap();
