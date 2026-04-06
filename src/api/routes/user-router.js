import express from 'express';
import { body } from 'express-validator'; 
import { deleteUser, getUser, getUserById, postUser, putUser } from '../controllers/user-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { validationErrors } from '../../middlewares/error-handlers.js';

const userRouter = express.Router();

userRouter.route('/')
  .get(authenticateToken, getUser)
  .post(
   
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric().withMessage('Username error'),
    body('password').trim().isLength({min: 8}).withMessage('Password too short (min 8)'),
    validationErrors, 
    postUser
  );

userRouter.route('/:id')
  .get(authenticateToken, getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;