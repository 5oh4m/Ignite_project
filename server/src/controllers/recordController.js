import MedicalRecord from '../models/MedicalRecord.js';
import path from 'path';
import fs from 'fs';

// @desc    Upload a medical record
// @route   POST /api/records
// @access  Private (Doctor/Admin)
export const uploadRecord = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        const { title, type, patientId, description } = req.body;

        const record = await MedicalRecord.create({
            title,
            category: type,
            description,
            patient: patientId,
            uploadedBy: req.user._id,
            fileUrl: req.file.path,
            fileType: path.extname(req.file.originalname).substring(1),
        });

        res.status(201).json({ success: true, record });
    } catch (error) {
        // Clean up file if DB save fails
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        next(error);
    }
};

// @desc    Get all records for a patient
// @route   GET /api/records/patient/:patientId
// @access  Private
export const getPatientRecords = async (req, res, next) => {
    try {
        // Check if user is authorized to view these records
        if (req.user.role === 'patient' && req.user._id.toString() !== req.params.patientId) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const records = await MedicalRecord.find({ patient: req.params.patientId })
            .populate('doctor', 'name')
            .populate('uploadedBy', 'name role')
            .sort('-createdAt');

        res.json({ success: true, count: records.length, records });
    } catch (error) {
        next(error);
    }
};

// @desc    Get my records
// @route   GET /api/records/me
// @access  Private
export const getMyRecords = async (req, res, next) => {
    try {
        const records = await MedicalRecord.find({ patient: req.user._id })
            .populate('doctor', 'name')
            .populate('uploadedBy', 'name role')
            .sort('-createdAt');

        res.json({ success: true, count: records.length, records });
    } catch (error) {
        next(error);
    }
};

// @desc    Download record
// @route   GET /api/records/:id/download
// @access  Private
export const downloadRecord = async (req, res, next) => {
    try {
        const record = await MedicalRecord.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }

        // Check auth
        if (req.user.role === 'patient' && record.patient.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const filePath = path.resolve(record.fileUrl);
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).json({ success: false, message: 'File not found on server' });
        }
    } catch (error) {
        next(error);
    }
};
