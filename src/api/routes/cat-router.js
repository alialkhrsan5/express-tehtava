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
import { authenticateToken } from '../../middlewares/authentication.js'; // Tuodaan vartija

const catRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

catRouter.route('/')
  .get(getCat)
  // Lisätään authenticateToken ennen kissa-postausta!
  .post(authenticateToken, upload.single('cat'), createThumbnail, postCat);

catRouter.route('/user/:id')
  .get(getCatsByUserId);

catRouter.route('/:id')
  .get(getCatById)
  .put(authenticateToken, putCat)    // Vain kirjautuneille
  .delete(authenticateToken, deleteCat); // Vain kirjautuneille

export default catRouter;