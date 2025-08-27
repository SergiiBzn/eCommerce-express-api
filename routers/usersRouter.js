import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { createUserSchema, updateUserSchema } from '../schemas/userSchemas.js';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', validate(createUserSchema), createUser);
userRouter.put('/:id', validate(updateUserSchema), updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
