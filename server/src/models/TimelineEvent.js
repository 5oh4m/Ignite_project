import mongoose from 'mongoose';

const timelineEventSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['surgery', 'diagnosis', 'prescription', 'visit', 'lab_report', 'other'],
        default: 'other',
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const TimelineEvent = mongoose.model('TimelineEvent', timelineEventSchema);

export default TimelineEvent;
