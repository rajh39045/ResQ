# 🚗 ResQ-System

<div align="center">

# Smart Roadside Vehicle Assistance & Mechanic Booking Platform

A modern full-stack MERN application that connects vehicle owners with nearby mechanics for emergency roadside assistance.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-22-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

</div>

---

# 📌 Overview

ResQ-System is an intelligent roadside assistance platform developed using the MERN Stack.

It helps vehicle owners quickly request emergency assistance from nearby mechanics and allows mechanics to accept requests, navigate to users, and update service status in real time.

---

# ✨ Features

## 👤 User Module

- User Registration & Login
- Secure JWT Authentication
- Add Multiple Vehicles
- Vehicle Management
- Request Roadside Assistance
- Live GPS Location
- Real-Time Mechanic Tracking
- Request History
- User Profile
- Notifications

---

## 🔧 Mechanic Module

- Mechanic Registration
- Mechanic Dashboard
- Accept / Reject Requests
- Live Location Updates
- Job Tracking
- Profile Management
- Service Completion

---

## 👨‍💼 Admin Module

- Dashboard Analytics
- Manage Users
- Manage Mechanics
- Manage Requests
- Platform Monitoring

---

# 🚀 Major Functionalities

- Emergency Roadside Assistance
- Vehicle Registration
- Mechanic Booking
- Real-Time Tracking
- Live Request Status
- User Authentication
- Protected Routes
- Responsive UI
- Dark Theme
- GSAP & Framer Motion Animations

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- React Toastify
- React Leaflet
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary

---

# 📂 Folder Structure

```
ResQ-System
│
├── frontend
│   ├── public
│   ├── src
│   │
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── api
│   ├── context
│   ├── hooks
│   ├── utils
│   ├── App.jsx
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/rajh39045/ResQ-System.git

cd ResQ-System
```

---

## Install Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

## Install Backend

```bash
cd backend

npm install

npm run dev
```

Backend runs at

```
http://localhost:5000
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

CLIENT_URL=http://localhost:5173
```

---

# 📡 API Modules

## Authentication

- Register
- Login
- Logout

---

## Vehicles

- Add Vehicle
- Get Vehicles
- Update Vehicle
- Delete Vehicle

---

## Requests

- Create Request
- View Requests
- Accept Request
- Reject Request
- Update Status
- Cancel Request

---

## Profile

- Get Profile
- Update Profile

---

# 🗺 Live Tracking

- User Current Location
- Mechanic Current Location
- Route Between User & Mechanic
- ETA Calculation
- Live Status Updates

---

# 🔒 Security Features

- JWT Authentication
- Password Encryption
- Protected API Routes
- Role-Based Access Control
- Secure Environment Variables

---

# 📱 Responsive Design

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🚀 Deployment

## Frontend

- Vercel

## Backend

- Render

## Database

- MongoDB Atlas

---

# 📸 Project Modules

- Home
- Login
- Register
- Dashboard
- Vehicles
- Add Vehicle
- Service Request
- Live Tracking
- Notifications
- Mechanic Dashboard
- Admin Dashboard
- Profile

---

# 🔮 Future Enhancements

- Socket.IO Live Tracking
- Payment Gateway
- AI Mechanic Recommendation
- Push Notifications
- SOS Emergency Button
- Voice Assistant
- Multi-language Support

---

# 👨‍💻 Author

**Raj Harsh**

GitHub:
https://github.com/rajh39045

---

# 📜 License

This project is licensed under the MIT License.

---

<div align="center">

### ⭐ If you like this project, don't forget to star the repository.

Made with ❤️ using React, Node.js, Express & MongoDB

</div>