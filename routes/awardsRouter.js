import express from 'express';
import {getAllAwards, getAwardById, getAwardsByBrand} from '../controllers/awardController.js';

const router = express.Router();

// Rutas para los premios
router.get('/', getAllAwards);
router.get('/:id', getAwardById);
router.get('/brand/:brand', getAwardsByBrand);

export default router;