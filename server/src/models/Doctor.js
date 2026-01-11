import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    qualifications: {
        type: [String],
        required: true,
    },
    experienceYears: {
        type: Number,
        required: true,
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
    },
    about: {
        type: String,
    },
    consultationFee: {
        type: Number,
        required: true,
    },
    availability: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
        slots: [{
            startTime: String, // "09:00"
            endTime: String,   // "11:00"
        }],
    }],
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
