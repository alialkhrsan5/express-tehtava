import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';
import { createThumbnail } from '../../middlewares/upload.js';

const catRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

catRouter.route('/')
  .get(getCat)
  .post(upload.single('cat'), createThumbnail, postCat);

catRouter.route('/user/:id')
  .get(getCatsByUserId);

catRouter.route('/:id')
  .get(getCatById)
  .put(putCat)
  .delete(deleteCat);

export default catRouter;