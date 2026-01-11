import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'rejected', 'completed', 'cancelled'],
        default: 'pending',
    },
    reason: {
        type: String, // Reason for visit
    },
    notes: {
        type: String, // Doctor's notes
    },
    diagnosis: {
        type: String,
    },
    prescription: {
        medicines: [{
            name: String,
            dosage: String,
            frequency: String,
            duration: String,
        }],
        instructions: String,
    },
    summaryPdfUrl: {
        type: String,
    },
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
