import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js'; // Remove one 'src/'
import collegeRoutes from './routes/collegeRoutes.js'; // Remove one 'src/'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'; // Remove one 'src/'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
// app.use(cors());
app.use(cors({
    origin: ["https://your-frontend-app.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Serve static files from React build (adjust path as needed)
app.use(express.static(path.join(__dirname, '../dist')));

// Routes
app.use('/api', authRoutes);
app.use('/api', collegeRoutes);

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;