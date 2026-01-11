import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { uploadRecord, getPatientRecords, getMyRecords, downloadRecord } from '../controllers/recordController.js';

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/records/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Images, PDFs and Docs only!'));
        }
    },
});

router.post('/', protect, authorize('doctor', 'admin'), upload.single('file'), uploadRecord);
router.get('/me', protect, getMyRecords);
router.get('/patient/:patientId', protect, getPatientRecords);
router.get('/:id/download', protect, downloadRecord);

export default router;
