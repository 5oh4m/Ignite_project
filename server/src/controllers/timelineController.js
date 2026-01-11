import TimelineEvent from '../models/TimelineEvent.js';
import Doctor from '../models/Doctor.js';

// @desc    Get timeline for logged in patient
// @route   GET /api/timeline
// @access  Private (Patient)
export const getMyTimeline = async (req, res, next) => {
    try {
        const events = await TimelineEvent.find({ patient: req.user.id })
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            })
            .sort({ date: -1 });

        res.json({ success: true, count: events.length, events });
    } catch (error) {
        next(error);
    }
};

// @desc    Get timeline for a specific patient (Admin/Doctor)
// @route   GET /api/timeline/:patientId
// @access  Private (Admin/Doctor)
export const getPatientTimeline = async (req, res, next) => {
    try {
        const events = await TimelineEvent.find({ patient: req.params.patientId })
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            })
            .sort({ date: -1 });

        res.json({ success: true, count: events.length, events });
    } catch (error) {
        next(error);
    }
};

// @desc    Add a timeline event
// @route   POST /api/timeline
// @access  Private (Admin/Doctor)
export const addTimelineEvent = async (req, res, next) => {
    try {
        const { patientId, title, type, description, date } = req.body;

        // Validation
        if (!patientId || !title) {
            return res.status(400).json({ success: false, message: 'Patient ID and Title are required' });
        }

        let doctorId = null;
        if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ user: req.user.id });
            if (doctor) doctorId = doctor._id;
        }

        const event = await TimelineEvent.create({
            patient: patientId,
            doctor: doctorId,
            title,
            type,
            description,
            date: date || Date.now(),
        });

        res.status(201).json({ success: true, event });
    } catch (error) {
        next(error);
    }
};
