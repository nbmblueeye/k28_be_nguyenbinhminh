import express from 'express';
import { auth , authAdmin } from '../middlewares/auth.js';
import { createMovie, deleteMovie, getMouvies,  getMouvie, updateMovie } from '../controllers/movieController.js';

const router  = express.Router();

router.get('/', auth, getMouvies);
router.get('/:id', auth, getMouvie);
router.post("/", auth, authAdmin , createMovie);
router.put("/:id", auth, authAdmin , updateMovie);
router.delete("/:id", auth, authAdmin , deleteMovie);

export { router as movieRouter };