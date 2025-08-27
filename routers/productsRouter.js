import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../schemas/productSchemas.js';
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/products.js';

const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProductById);
productsRouter.post('/', validate(createProductSchema), createProduct);
productsRouter.put('/:id', validate(updateProductSchema), updateProduct);
productsRouter.delete('/:id', deleteProduct);

export default productsRouter;
