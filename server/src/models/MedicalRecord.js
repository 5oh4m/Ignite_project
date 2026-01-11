import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        enum: ['consultation', 'lab_report', 'prescription', 'imaging', 'other'],
        default: 'other',
    },
    fileUrl: {
        type: String, // Cloud storage URL or local path
    },
    fileType: {
        type: String, // pdf, jpg, png, etc.
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isVisible: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Index for quick patient record lookup
medicalRecordSchema.index({ patient: 1, createdAt: -1 });

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
