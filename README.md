#  Matrimony Platform – Backend

A robust backend server for the Matrimony Platform built with Node.js, Express.js, and MongoDB. Provides secure REST APIs for authentication, biodata management, premium membership, admin controls, and payment processing.

Live API:

API Base URL: https://matrimony-server-side-sigma.vercel.app

📑 Table of Contents
✨ Features

🏗️ Architecture

📁 Project Structure

🔐 Authentication System

🗄️ Database Schema

🔌 API Documentation

💳 Payment Integration

🚀 Installation & Setup

⚙️ Environment Variables

📊 API Response Formats

🔧 Middleware System

🚢 Deployment

👨‍💻 Author

✨ Features
🔐 Authentication & Security
JWT-based authentication

Firebase Admin integration for user management

Role-based access control (User/Admin)

Password encryption with bcrypt

Token refresh mechanism

Rate limiting and DDoS protection

💼 Core Functionality
User registration and profile management

Biodata CRUD operations with validation

Advanced search and filtering

Matchmaking algorithms

Contact request system

Favorites/bookmarking system

👑 Admin Features
User management dashboard

Content moderation

Payment transaction monitoring

Analytics and reporting

System configuration

Email notification management

💳 Payment System
Stripe integration for payments

Premium subscription management

Payment webhook handling

Invoice generation

Refund processing

🤖 AI & Intelligence
Profile compatibility scoring

Smart match recommendations

Profile completeness analysis

Behavioral insights

Automated suggestions

🏗️ Architecture
System Architecture Diagram:
![alt text](https://i.ibb.co.com/Rkn8rPCr/deepseek-mermaid-20260210-2fe0dc.png)

Request Flow Architecture:
![alt text](https://i.ibb.co.com/jvj5t5CP/request.png)

# Project Structure

MATRIMONY-SERVER-SIDE/
│
├── .cph/ # Internal configs
├── .vercel/ # Vercel deployment files
├── node_modules/
│
├── .env # Environment variables
├── .gitignore
│
├── db.js # MongoDB connection
├── firebase.json # Firebase config
├── index.js # Main entry file
├── middlewares.js # Auth & role middlewares
├── routes.js # All API routes
├── server.js # Server startup
│
├── package.json
├── package-lock.json
├── vercel.json # Vercel deployment config
└── README.md

Authentication System
JWT Authentication Flow

![alt text](https://i.ibb.co.com/9m1MRMP5/auth.png)

Database Schema
User Schema
javascript
{
  _id: ObjectId,
  uid: String, // Firebase UID
  email: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profile: {
    name: String,
    phone: String,
    photoURL: String,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    dateOfBirth: Date,
    occupation: String,
    education: String,
    location: String
  },
  preferences: {
    minAge: Number,
    maxAge: Number,
    preferredGender: String,
    preferredOccupation: [String],
    preferredEducation: [String]
  },
  membership: {
    type: { type: String, enum: ['free', 'premium', 'vip'], default: 'free' },
    expiryDate: Date,
    features: [String]
  },
  status: { type: String, enum: ['active', 'suspended', 'deleted'], default: 'active' },
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
Biodata Schema
javascript
{
  _id: ObjectId,
  userId: ObjectId,
  basicInfo: {
    fullName: String,
    gender: String,
    dateOfBirth: Date,
    height: Number,
    weight: Number,
    bloodGroup: String,
    maritalStatus: String,
    religion: String,
    caste: String
  },
  educationCareer: {
    highestEducation: String,
    institution: String,
    occupation: String,
    designation: String,
    company: String,
    annualIncome: Number
  },
  familyInfo: {
    fatherOccupation: String,
    motherOccupation: String,
    siblings: Number,
    familyType: String,
    familyStatus: String
  },
  lifestyle: {
    diet: String,
    smoke: Boolean,
    drink: Boolean,
    hobbies: [String],
    languages: [String]
  },
  partnerExpectation: {
    minAge: Number,
    maxAge: Number,
    minHeight: Number,
    maxHeight: Number,
    education: String,
    occupation: [String],
    maritalStatus: String
  },
  contactInfo: {
    phone: String,
    email: String,
    address: String,
    visibility: { type: String, enum: ['public', 'premium', 'admin'], default: 'premium' }
  },
  photos: [{
    url: String,
    isPrimary: Boolean,
    approved: Boolean
  }],
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  isFeatured: Boolean,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
 API Documentation
Base URL
text
https://matrimony-server-side-sigma.vercel.app/api/v1

Example API Requests
1. User Registration
http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "profile": {
    "name": "John Doe",
    "gender": "male",
    "dateOfBirth": "1990-01-01"
  }
}
2. Create Biodata
http
POST /api/v1/biodata
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "basicInfo": {
    "fullName": "John Doe",
    "gender": "male",
    "dateOfBirth": "1990-01-01",
    "height": 175,
    "religion": "Islam"
  },
  "educationCareer": {
    "highestEducation": "Masters",
    "occupation": "Software Engineer"
  }
}
3. Search Biodata
http
GET /api/v1/biodata/search?gender=female&minAge=25&maxAge=35&occupation=Engineer
Authorization: Bearer <jwt_token>
4. Create Payment Intent
http
POST /api/v1/payments/create-intent
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "packageId": "premium_gold",
  "amount": 2999,
  "currency": "BDT"
}
💳 Payment Integration
Stripe Payment Flow
![alt text](https://i.ibb.co.com/6RnPFrcR/deepseek-mermaid-20260210-5e58c9.png)
 Installation & Setup
Prerequisites
Node.js (v18 or higher)

MongoDB (v6 or higher)

Firebase Admin Account

Stripe Account

Git

Step 1: Clone Repository
bash

git clone https://github.com/Ebrahim112002/metrimoni_backend.git

cd MATRIMONY-SERVER-SIDE

Step 2: Install Dependencies
bash
npm install
Step 3: Environment Configuration
bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
nano .env  # or use any text editor
Step 4: Run Database
bash
# Make sure MongoDB is running
mongod

# Or if using MongoDB Atlas, update DB_URI in .env
Step 5: Start Development Server
bash
# Development mode with hot reload
npm run dev

# Production mode
npm start

# The server will run on http://localhost:5000
Step 6: Verify Installation
bash
# Test API health
curl http://localhost:5000/api/health

# Expected response:
# {"status":"success","message":"Server is running","timestamp":"2024-02-10T10:30:00Z"}
⚙️ Environment Variables
Required Variables
env
# Server Configuration
PORT=5000
NODE_ENV=development
API_VERSION=v1
CORS_ORIGIN=http://localhost:5173

# Database
DB_URI=mongodb://localhost:27017/matrimony_db
# OR MongoDB Atlas
# DB_URI=mongodb+srv://username:password@cluster.mongodb.net/matrimony_db
env
# Redis Cache (Optional)
REDIS_URL=redis://localhost:6379

# Sentry Error Tracking (Optional)
SENTRY_DSN=


# Analytics (Optional)
GOOGLE_ANALYTICS_ID=
📊 API Response Formats
Success Response
json
{
  "status": "success",
  "statusCode": 200,
  "message": "Operation completed successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe"
    }
  },
  "timestamp": "2024-02-10T10:30:00.000Z"
}
Error Response
json
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ],
  "timestamp": "2024-02-10T10:30:00.000Z"
}
Paginated Response
json
{
  "status": "success",
  "statusCode": 200,
  "message": "Data retrieved successfully",
  "data": {
    "items": [
      { /* item 1 */ },
      { /* item 2 */ }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "pages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "timestamp": "2024-02-10T10:30:00.000Z"
}
🔧 Middleware System
Authentication Middleware
javascript
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('Access denied. No token provided.');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Authentication failed',
      error: error.message
    });
  }
};
Admin Middleware
javascript
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};
Validation Middleware
javascript
const validateBiodata = (req, res, next) => {
  const schema = Joi.object({
    basicInfo: Joi.object({
      fullName: Joi.string().min(3).max(100).required(),
      gender: Joi.string().valid('male', 'female', 'other').required(),
      dateOfBirth: Joi.date().max(new Date()).required(),
      // ... more validation rules
    }).required(),
    // ... other validations
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }
  next();
};
🚢 Deployment
Vercel Deployment
Install Vercel CLI

bash
npm i -g vercel
Login to Vercel

bash
vercel login
Deploy

bash
vercel --prod
Environment Variables on Vercel
bash
vercel env add DB_URI
vercel env add JWT_SECRET
# ... add all required env variables
Docker Deployment
dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
PM2 Process Manager
bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name matrimony-backend

# Save process list
pm2 save

# Set up startup script
pm2 startup
📈 Monitoring & Logging
Logging Configuration
javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
Health Check Endpoint
http
GET /api/health
Response:
{
  "status": "healthy",
  "timestamp": "2024-02-10T10:30:00Z",
  "services": {
    "database": "connected",
    "firebase": "connected",
    "stripe": "connected"
  },
  "uptime": 3600,
  "memoryUsage": {
    "heapUsed": "45.2 MB",
    "heapTotal": "73.7 MB"
  }
}
🧪 Testing
Run Tests
bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Test with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
Sample Test
javascript
describe('Authentication', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });
});
🔒 Security Features
JWT Token Security

Short-lived access tokens

Refresh token rotation

Token blacklisting

IP-based token validation

Input Validation

Request body validation

SQL injection prevention

XSS protection

File upload validation

Rate Limiting

IP-based rate limiting

User-based rate limiting

Burst protection

DDoS mitigation

HTTPS Enforcement

Force HTTPS in production

HSTS headers

Secure cookies

CSP headers

📞 Support
Issue Reporting
Check existing issues

Create new issue with:

Error message

Steps to reproduce

Expected behavior

Screenshots if applicable

API Support
Email: [Your Support Email]

GitHub Issues: [Project Issues Page]

Documentation: [API Docs URL]

👨‍💻 Author

Md Ebrahim,Aka Mondal Tithi

MERN Stack Developer



