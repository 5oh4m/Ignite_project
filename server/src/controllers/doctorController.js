import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

// @desc    Get doctor profile by ID
// @route   GET /api/doctors/:id
// @access  Public
export const getDoctorProfile = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
            .populate('user', 'name profileImage')
            .populate('hospital', 'name address location phone');

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        res.json({ success: true, doctor });
    } catch (error) {
        next(error);
    }
};

// @desc    Get current doctor's appointments
// @route   GET /api/doctors/me/appointments
// @access  Private (Doctor only)
export const getDoctorAppointments = async (req, res, next) => {
    try {
        // 1. Find the doctor profile associated with the logged-in user
        const doctor = await Doctor.findOne({ user: req.user.id });
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor profile not found' });
        }

        // 2. Find appointments for this doctor
        const appointments = await Appointment.find({ doctor: doctor._id })
            .populate('patient', 'name email phone gender age') // Populate patient details
            .populate('hospital', 'name')
            .sort({ date: 1 }); // Sort by date ascending

        res.json({ success: true, count: appointments.length, appointments });
    } catch (error) {
        next(error);
    }
};

// @desc    Update consultation notes / Add summary
// @route   POST /api/appointments/:id/doctor/notes
// @access  Private (Doctor only)
export const updateAppointmentNotes = async (req, res, next) => {
    try {
        const { notes, diagnosis, prescription } = req.body;

        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Verify the doctor owns this appointment
        const doctor = await Doctor.findOne({ user: req.user.id });
        if (appointment.doctor.toString() !== doctor._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this appointment' });
        }

        appointment.notes = notes || appointment.notes;
        appointment.diagnosis = diagnosis || appointment.diagnosis;
        appointment.prescription = prescription || appointment.prescription;

        if (req.body.status) {
            appointment.status = req.body.status;
        } else {
            appointment.status = 'completed';
        }

        await appointment.save();

        res.json({ success: true, appointment });
    } catch (error) {
        next(error);
    }
};
