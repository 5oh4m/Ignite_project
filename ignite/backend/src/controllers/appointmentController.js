import Appointment from "../models/Appointment.js";

// GET all appointments
export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST add appointment
export const createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
