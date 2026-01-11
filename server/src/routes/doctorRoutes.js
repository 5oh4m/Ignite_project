import express from 'express';
import { getDoctorProfile, getDoctorAppointments, updateAppointmentNotes } from '../controllers/doctorController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me/appointments', protect, authorize('doctor'), getDoctorAppointments);
router.post('/appointments/:id/notes', protect, authorize('doctor'), updateAppointmentNotes);
router.get('/:id', getDoctorProfile); // Public profile

export default router;
