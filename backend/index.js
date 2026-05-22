import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import orderRouter from './routes/order.router.js';
import adminDashboardRouter from './routes/adminDashboard.router.js';
import adminProductRouter from './routes/adminProduct.router.js';
import adminOrderRouter from './routes/adminOrder.router.js';
import adminCustomerRouter from './routes/adminCustomer.router.js';
import adminDeliveryRouter from './routes/adminDelivery.router.js';
import adminStaffRouter from './routes/adminStaff.router.js';
import adminCustomizationRouter from './routes/adminCustomization.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:4028';

// Middlewares
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRouter);

// Admin routes
app.use('/api/admin/dashboard', adminDashboardRouter);
app.use('/api/admin/products', adminProductRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/admin/customers', adminCustomerRouter);
app.use('/api/admin/delivery-zones', adminDeliveryRouter);
app.use('/api/admin/staff', adminStaffRouter);
app.use('/api/admin/customizations', adminCustomizationRouter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString(), role: 'unified-api' });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Cuppiecake Customer Backend API',
    status: 'running',
    endpoints: [
      '/api/auth',
      '/api/orders',
      '/api/admin/dashboard',
      '/api/admin/products',
      '/api/admin/orders',
      '/api/admin/customers',
      '/api/admin/delivery-zones',
      '/api/admin/staff',
      '/api/admin/customizations'
    ]
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// DB connect and start
const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cuppiecake';

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, { 
      dbName: 'cuppiecake',
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB error:', error.message);
    throw error;
  }
}

// For Vercel serverless - export the app
export default async function handler(req, res) {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Database connection failed',
      message: error.message 
    });
  }
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  connectToDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Failed to start:', err);
    });
}
