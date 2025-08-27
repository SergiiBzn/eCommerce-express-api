import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import {
  createCategorySchema,
  updateUserSchema,
} from '../schemas/categorySchemas.js';
import {
  getCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.js';

const categoryRouter = Router();

categoryRouter.get('/', getCategory);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.post('/', validate(createCategorySchema), createCategory);
categoryRouter.put('/:id', validate(updateUserSchema), updateCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
