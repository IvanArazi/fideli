import express from 'express';
import {getAllBrands, getBrandById, getBrandsByCategoryId} from '../controllers/brandController.js';

const router = express.Router();

// Rutas para las marcas
router.get('/', getAllBrands);
router.get('/:id', getBrandById);
router.get('/category/:id', getBrandsByCategoryId);

export default router;