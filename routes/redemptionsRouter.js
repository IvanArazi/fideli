import express from 'express';
import {getAllRedemptions, getRedemptionById, getRedemptionByUserAndAward} from '../controllers/redemptionController.js';

const router = express.Router();

// Rutas para los canjes
router.get('/', getAllRedemptions);
router.get('/:id', getRedemptionById);
router.get('/user/:user/award/:award', getRedemptionByUserAndAward);

export default router;