import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import {
  createOrderSchema,
  updateOrderSchema,
} from '../schemas/orderSchemas.js';
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orders.js';

const ordersRouter = Router();

ordersRouter.get('/', getOrders);
ordersRouter.get('/:id', getOrderById);
ordersRouter.post('/', validate(createOrderSchema), createOrder);
ordersRouter.put('/:id', validate(updateOrderSchema), updateOrder);
ordersRouter.delete('/:id', deleteOrder);

export default ordersRouter;
