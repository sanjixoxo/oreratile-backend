/*import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import connectDB from './Config/databases.js';
import authRoutes from './routes/authroutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

// ES6 __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'Utilities', '.env') });

// 🔍 DEBUG: Check if environment variables are loaded
console.log("📍 .env path:", path.join(__dirname, 'Utilities', '.env'));
console.log("MONGO_URI loaded:", process.env.MONGO_URI ? "✅ YES" : "❌ NO");
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "✅ YES" : "❌ NO");

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('📁 Created uploads directory');
}

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration
/*app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cors({
  origin: [
    "http://localhost:5173", // Local development
    "https://oranwashez.vercel.app/",
    "https://oranwashey.vercel.app/" // Production frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically (CRITICAL FIX!)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`🌐 Frontend URL: http://localhost:5173`);
});*/

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import connectDB from './Config/databases.js';
import authRoutes from './routes/authroutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

// ES6 __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'Utilities', '.env') });

// 🔍 DEBUG: Check if environment variables are loaded
console.log("📍 .env path:", path.join(__dirname, 'Utilities', '.env'));
console.log("MONGO_URI loaded:", process.env.MONGO_URI ? "✅ YES" : "❌ NO");
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "✅ YES" : "❌ NO");

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('📁 Created uploads directory');
}

// Connect to MongoDB
connectDB();

const app = express();

// ✅ FIXED CORS - removed trailing slashes
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://oranwashez.vercel.app",
    "https://oranwashey.vercel.app"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Blog API Server',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      posts: '/api/posts',
      users: '/api/users'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server - bind to 0.0.0.0 for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`🌐 CORS enabled for: http://localhost:5173, Vercel deployments`);
});

