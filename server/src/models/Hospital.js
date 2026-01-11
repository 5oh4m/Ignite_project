import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: { type: String, default: 'India' },
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    website: {
        type: String,
    },
    departments: [String],
    amenities: [String],
    totalBeds: Number,
    availableBeds: Number,
    image: String,
}, {
    timestamps: true,
});

// Create 2dsphere index for geospatial queries
hospitalSchema.index({ location: '2dsphere' });

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;
