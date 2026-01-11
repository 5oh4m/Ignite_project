import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Hospital from '../models/Hospital.js';
import PDFDocument from 'pdfkit';

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private (Patient)
export const bookAppointment = async (req, res, next) => {
    try {
        const { doctorId, hospitalId, date, reason } = req.body;

        // Validation
        if (!doctorId || !hospitalId || !date) {
            return res.status(400).json({ success: false, message: 'Please provide doctor, hospital, and date' });
        }

        // Check if doctor/hospital exist
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) return res.status(404).json({ success: false, message: 'Hospital not found' });

        // Create appointment
        const appointment = await Appointment.create({
            patient: req.user.id, // From authMiddleware
            doctor: doctorId,
            hospital: hospitalId,
            date,
            reason,
            status: 'pending',
        });

        res.status(201).json({ success: true, appointment });
    } catch (error) {
        next(error);
    }
};

// @desc    Get my appointments (Patient)
// @route   GET /api/appointments/me
// @access  Private
export const getMyAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({ patient: req.user.id })
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            })
            .populate('hospital', 'name address')
            .sort({ date: -1 });

        res.json({ success: true, count: appointments.length, appointments });
    } catch (error) {
        next(error);
    }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointmentById = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('patient', 'name email')
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            })
            .populate('hospital', 'name');

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Authorization check: Patient or the specific Doctor or Admin
        const isPatient = appointment.patient._id.toString() === req.user.id;
        const isAdmin = req.user.role === 'admin';

        let isDoctor = false;
        if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ user: req.user.id });
            if (doctor && appointment.doctor._id.toString() === doctor._id.toString()) {
                isDoctor = true;
            }
        }

        if (!isPatient && !isAdmin && !isDoctor) {
            return res.status(403).json({ success: false, message: 'Not authorized to view this appointment' });
        }

        res.json({ success: true, appointment });
    } catch (error) {
        next(error);
    }
};

// @desc    Update appointment status (Admin/Doctor)
// @route   PUT /api/appointments/:id/status
// @access  Private (Admin/Doctor)
export const updateAppointmentStatus = async (req, res, next) => {
    try {
        const { status, remarks } = req.body; // confirmed, rejected, cancelled

        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        appointment.status = status;
        if (remarks) appointment.notes = (appointment.notes ? appointment.notes + '\n' : '') + `Status update: ${remarks}`;

        await appointment.save();

        res.json({ success: true, appointment });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all appointments (Admin/Doctor)
// @route   GET /api/appointments
// @access  Private (Admin/Doctor)
export const getAllAppointments = async (req, res, next) => {
    try {
        const { status } = req.query;
        let query = {};

        // If doctor, only show their appointments
        if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ user: req.user.id });
            if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });
            query.doctor = doctor._id;
        }

        if (status) {
            query.status = status;
        }

        const appointments = await Appointment.find(query)
            .populate('patient', 'name email phone avatar') // Populate patient details
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            })
            .populate('hospital', 'name')
            .sort({ date: 1 }); // Oldest first for pending queue

        res.json({ success: true, count: appointments.length, appointments });
    } catch (error) {
        next(error);
    }
};

// @desc    Download appointment summary PDF
// @route   GET /api/appointments/:id/summary
// @access  Private
export const getAppointmentSummary = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('patient', 'name email phone')
            .populate({
                path: 'doctor',
                populate: { path: 'user', select: 'name' }
            })
            .populate('hospital', 'name address');

        if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

        // Auth check
        const isPatient = appointment.patient._id.toString() === req.user.id;
        const isAdmin = req.user.role === 'admin';
        // Doctor check could be added but mostly patient needs this

        if (!isPatient && !isAdmin) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const doc = new PDFDocument();
        const filename = `Summary-${appointment._id}.pdf`;

        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        doc.pipe(res);

        // Header
        doc.fontSize(25).fillColor('#2563EB').text('MedLink', { align: 'center' });
        doc.fontSize(12).fillColor('black').text('Your Health, Connected.', { align: 'center' });
        doc.moveDown();
        doc.fontSize(18).text('Appointment Summary', { align: 'center', underline: true });
        doc.moveDown();

        // Details
        doc.fontSize(12);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'right' });
        doc.moveDown();

        doc.font('Helvetica-Bold').text('Patient Details:');
        doc.font('Helvetica').text(`Name: ${appointment.patient.name}`);
        doc.text(`Email: ${appointment.patient.email}`);
        doc.text(`Phone: ${appointment.patient.phone || 'N/A'}`);
        doc.moveDown();

        doc.font('Helvetica-Bold').text('Appointment Details:');
        doc.font('Helvetica').text(`Date: ${new Date(appointment.date).toLocaleString()}`);
        doc.text(`Doctor: Dr. ${appointment.doctor.user.name}`);
        doc.text(`Hospital: ${appointment.hospital.name}`);
        doc.text(`Status: ${appointment.status.toUpperCase()}`);
        doc.moveDown();

        if (appointment.notes) {
            doc.font('Helvetica-Bold').text('Clinical Notes / Diagnosis:');
            doc.font('Helvetica').text(appointment.notes);
        }

        doc.moveDown(2);
        doc.fontSize(10).text('This is a system generated document.', { align: 'center', color: 'gray' });

        doc.end();

    } catch (error) {
        next(error);
    }
};
