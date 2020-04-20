import Next from 'next';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import configureRoutes from './routes/configureRoutes';


const configureApp = (server: Express) => {
  server.use(bodyParser.json({
    limit: '2mb'
  }));

  server.use(bodyParser.urlencoded({
    limit: '2mb',
    extended: true,
    parameterLimit: 2000
  }));

  server.use(cookieParser());

  server.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    }
    next();
  })
}


async function bootstrap() {
  const next = Next({ dev: process.env.NODE_ENV === 'development', dir: '.' });

  await next.prepare();

  const server = express();

  configureApp(server);
  configureRoutes(server);

  const handle = next.getRequestHandler();

  server.get('*', (req, res) => handle(req, res));

  await server.listen(process.env.PORT);
}

bootstrap();
