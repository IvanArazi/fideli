import express from 'express';
import {getAllUsers, getUserById, createUser, auth} from '../controllers/userController.js';

const router = express.Router();

// Rutas para los usuarios
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/auth', auth);

export default router;