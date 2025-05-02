import express from 'express';
import {getAllAwards, getAwardsByBrand, createAward, getAwardsById} from '../controllers/awardController.js';
import {validationTokenBrand} from '../middlewares/authBrand.js';

const router = express.Router();

// Rutas para los premios
router.get('/', getAllAwards);
router.get('/brand/:brand', getAwardsByBrand);
router.get('/:id', getAwardsById);
router.post('/', validationTokenBrand, createAward);

export default router;