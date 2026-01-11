import Hospital from '../models/Hospital.js';

// @desc    Get nearby hospitals
// @route   GET /api/hospitals
// @access  Public
// @desc    Get nearby hospitals
// @route   GET /api/hospitals
// @access  Public
export const getHospitals = async (req, res, next) => {
    try {
        const { lat, lng, radius, city, search } = req.query;

        let query = {};

        // Geospatial Search (Only if coordinates provided)
        if (lat && lng) {
            const radiusInMeters = (radius || 50) * 1000; // Increase default radius to 50km
            query.location = {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(lng), parseFloat(lat)],
                    },
                    $maxDistance: radiusInMeters,
                },
            };
        }

        // Text Search
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // City Filter
        if (city) {
            query['address.city'] = { $regex: city, $options: 'i' };
        }

        // If no filters, return top 20 (or sort by name)
        const hospitals = await Hospital.find(query).limit(50);

        res.json({ success: true, count: hospitals.length, hospitals });
    } catch (error) {
        // Handle "Planner error" which happens if $near is used without index (though we have it)
        console.error("Hospital Search Error:", error);
        next(error);
    }
};

// @desc    Get hospital by ID
// @route   GET /api/hospitals/:id
// @access  Public
export const getHospitalById = async (req, res, next) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }
        res.json({ success: true, hospital });
    } catch (error) {
        next(error);
    }
};
