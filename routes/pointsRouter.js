import express from 'express';
import {getAllPoints, getPointsById, getPointsByUserAndBrand} from '../controllers/pointController.js';

const router = express.Router();

// Rutas para los puntos
router.get('/', getAllPoints);
router.get('/:id', getPointsById);
router.get('/user/:user/brand/:brand', getPointsByUserAndBrand);

export default router;