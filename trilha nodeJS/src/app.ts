import 'reflect-metadata';
import express from 'express';
import { router } from './routes';
import createConnection from './database/index';
createConnection;
const app = express();
app.use(express.json());
app.use(router);

export { app };
