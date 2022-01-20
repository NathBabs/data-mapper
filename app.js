import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import morgan from 'morgan';
import routes from './routes/index.js'
const app = express();

app.use(morgan('dev'))
app.use(json());
app.use(routes);


export default app;