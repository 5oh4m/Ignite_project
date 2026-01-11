import User from '../models/User.js';

// @desc    Get all users with role 'patient'
// @route   GET /api/admin/patients
// @access  Private (Admin only)
export const getAllPatients = async (req, res, next) => {
    try {
        const patients = await User.find({ role: 'patient' }).select('-password');
        res.json({ success: true, count: patients.length, patients });
    } catch (error) {
        next(error);
    }
};
