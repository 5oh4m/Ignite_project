import express from 'express';
import {
    getMyTimeline,
    getPatientTimeline,
    addTimelineEvent
} from '../controllers/timelineController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getMyTimeline)
    .post(protect, authorize('admin', 'doctor'), addTimelineEvent);

router.route('/:patientId')
    .get(protect, authorize('admin', 'doctor'), getPatientTimeline);

export default router;
