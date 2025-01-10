import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalError';

const app: Application = express();

app.use(express.json());


app.use(
  cors({
    origin: ['https://ena-ema-client-one.vercel.app','http://localhost:3000'],
    credentials: true,
  }),
);
app.options('*', cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});






app.get('/', (req, res) => {
  res.send('Welcome to Ena_ema Server! The server running well in root path')
})

app.use(cookieParser());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send({
    Message: 'Electon is server..',
  });
});
app.use('/', router);
app.use(globalErrorHandler);


app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API NOT FOUND!',
    error: {
      path: req.originalUrl,
      message: 'Your requested path is not found!',
    },
  });
});
export default app;