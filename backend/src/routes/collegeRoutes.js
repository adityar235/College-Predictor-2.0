import express from 'express';
import { collegeController } from '../controllers/collegeController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/getColleges', authenticateToken, collegeController.getColleges);

export default router;