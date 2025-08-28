import express from 'express';
import cors from 'cors';
import './models/index.js';

import usersRouter from './routers/usersRouter.js';
import productsRouter from './routers/productsRouter.js';
import categoriesRouter from './routers/categoriesRouter.js';
import ordersRouter from './routers/ordersRouter.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ msg: err.message || 'Internal Server Error' });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
