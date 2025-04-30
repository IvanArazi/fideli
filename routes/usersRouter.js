import express from 'express';
import {getAllUsers, getUserById, createUser, deleteUser, auth} from '../controllers/userController.js';
import { validationToken } from '../middlewares/auth.js';

const router = express.Router();

// Rutas para los usuarios
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', validationToken, deleteUser);
router.post('/auth', auth);

export default router;