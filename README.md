#  Matrimony Platform – Backend

This is the backend server for the Matrimony Platform built using Node.js, Express.js, and MongoDB.  
It provides REST APIs for authentication, biodata management, premium membership, admin control, and payments.

The server also integrates Firebase Admin and JWT for secure access control.

---

##  Overview

Backend responsibilities:

- Handle REST API requests
- User Authentication & Authorization
- Biodata CRUD Operations
- Premium Membership Management
- Admin Controls
- Stripe Payment Processing
- Database Communication

---

## Features

- Express REST API
- JWT Authentication
- Firebase Admin Integration
- Role Based Access Control
- MongoDB Database
- Stripe Payment APIs
- Middleware Protected Routes
- Admin Operations
- AI Match Recommendation
- Chat API

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB
- Firebase Admin
- JWT
- Stripe
- Vercel Deployment

---

## 📁 Project Structure

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


---

## ⚙️ Installation

### Clone Repository

git clone https://github.com/Ebrahim112002/metrimoni_backend.git
cd MATRIMONY-SERVER-SIDE


---

### Install Dependencies

npm install


---

## ▶️ Run Backend Locally

nodemon server.js


or

node index.js


Server runs on:

http://localhost:5000


---

## 🔐 Environment Variables

Create `.env` file:

PORT=5000
DB_URI=your_mongodb_url
JWT_SECRET=jwt_secret
STRIPE_SECRET=_stripe_secret
FIREBASE_SERVICE_KEY=firebase_key


---

## 📡 API Examples

GET /users
POST /biodata
PATCH /premium/:id
DELETE /user/:id
POST /create-payment-intent


---

## Deployed Server

[(backend live link here)](https://matrimony-server-side-sigma.vercel.app/)


---

## 👩‍💻 Author

Ayaan , Aka modal tithi
MERN Stack Developer  
