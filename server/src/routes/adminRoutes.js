import express from 'express';
import { getAllPatients } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/patients', protect, authorize('admin', 'doctor'), getAllPatients); // Allow doctors to see all patients too for now

export default router;
