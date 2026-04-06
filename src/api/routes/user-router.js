import express from 'express';
import { deleteUser, getUser, getUserById, postUser, putUser } from '../controllers/user-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js'; 

const userRouter = express.Router();

userRouter.route('/')
  .get(authenticateToken, getUser) 
  .post(postUser); 

userRouter.route('/:id')
  .get(authenticateToken, getUserById)
  .put(authenticateToken, putUser)    
  .delete(authenticateToken, deleteUser); 

export default userRouter;