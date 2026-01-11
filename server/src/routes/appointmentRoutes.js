import express from 'express';
import {
    bookAppointment,
    getMyAppointments,
    getAppointmentById,
    updateAppointmentStatus,
    getAllAppointments,
    getAppointmentSummary
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, bookAppointment)
    .get(protect, authorize('admin', 'doctor'), getAllAppointments);

router.route('/me')
    .get(protect, getMyAppointments);

router.route('/:id')
    .get(protect, getAppointmentById);

router.route('/:id/status')
    .put(protect, authorize('admin', 'doctor', 'patient'), updateAppointmentStatus);

router.get('/:id/summary', protect, getAppointmentSummary);

export default router;
