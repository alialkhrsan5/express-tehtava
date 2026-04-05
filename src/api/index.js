import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js'; // Lisätty käyttäjien reititin

const router = express.Router();

// Sidotaan reitit
router.use('/cats', catRouter);
router.use('/users', userRouter); // Kaikki /users -alkuiset pyynnöt menevät userRouterille

export default router;