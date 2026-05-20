import express from 'express';
import cors from 'cors';

import contactRoutes from './routes/contacts.routes.js';

import {
  errorMiddleware
} from './middleware/error.middleware.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  '/api/contacts',
  contactRoutes
);

app.use(errorMiddleware);

app.use(cors({
  origin: '*'
}));

export default app;
