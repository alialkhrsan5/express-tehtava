import express from 'express';
import { body } from 'express-validator';
import { deleteCat, getCat, getCatById, postCat, putCat } from '../controllers/cat-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { upload, createThumbnail } from '../../middlewares/upload.js'; 
import { validationErrors } from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

catRouter.route('/')
  .get(getCat)
  .post(
    authenticateToken,      
    upload.single('cat'),    
    createThumbnail,        
    body('cat_name').trim().isLength({min: 2, max: 50}).withMessage('Name error'), 
    body('weight').isFloat({gt: 0}).withMessage('Weight error'),
    body('birthdate').isISO8601().withMessage('Date error'),
    validationErrors,       
    postCat                 
  );

catRouter.route('/:id')
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);

export default catRouter;