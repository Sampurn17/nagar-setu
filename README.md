# NagarSetu

A modern civic complaint management platform that enables citizens to report municipal issues with image uploads, precise map locations, and real-time complaint tracking while allowing administrators to efficiently manage and resolve complaints.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.x-61DAFB)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248)
![Express](https://img.shields.io/badge/backend-Express%205-000000)

---

## Overview

NagarSetu is a comprehensive civic-tech platform designed to bridge the gap between citizens and municipal authorities. It addresses the common challenge of unreported urban issues—like broken roads, water leakage, or faulty street lights—by providing a streamlined, accessible way to log complaints directly to the concerned departments. 

Effective civic complaint management is essential for building smart, responsive, and sustainable cities. By bringing transparency and accountability into the resolution process, NagarSetu empowers citizens to take an active role in their communities while giving municipal bodies the structured data they need to prioritize and resolve issues efficiently. 

Citizens benefit from an intuitive interface with location-based reporting, allowing them to pinpoint issues on an interactive map and attach photographic evidence. Municipalities benefit from department-wise management and a powerful analytics dashboard that provides real-time complaint visualization, helping them track the entire lifecycle of a complaint from submission to resolution.

---

## Features

### Citizen Features
- Secure Authentication
- Register/Login
- Report Complaints
- Upload Images (Cloudinary)
- Select complaint location directly from interactive map
- Automatic latitude & longitude capture
- Department-wise complaint categorization
- View own complaints
- Interactive dashboard
- Live complaint map
- Analytics dashboard
- Real-time complaint status tracking

### Admin Features
- View all complaints
- Update complaint status
- Mark complaints as Assigned
- Mark complaints as Resolved
- Department-wise management
- Live dashboard overview

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | React, React Router, Tailwind CSS, React Leaflet, Axios, Recharts, Lucide Icons |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, Multer, Cloudinary, Cookie Parser |
| **Database** | MongoDB Atlas |
| **Maps** | Leaflet, OpenStreetMap |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## Project Structure

```text
NagarSetu/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## System Architecture

```text
Citizen
   ↓
Frontend (React)
   ↓
Express API
   ↓
MongoDB Atlas
   ↓
Cloudinary (Image Storage)
```

---

## Screenshots

### Home Page
*(Add Screenshot Here)*

### Dashboard
*(Add Screenshot Here)*

### Analytics
*(Add Screenshot Here)*

### Report Complaint
*(Add Screenshot Here)*

### Admin Dashboard
*(Add Screenshot Here)*

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Sampurn17/nagar-setu.git
cd nagar-setu
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 4. Create Environment Variables
Create a `.env` file in the `backend/` directory with the variables listed below.

### 5. Run Backend Server
```bash
cd backend
node server.js
```

### 6. Run Frontend Application
```bash
cd frontend
npm run dev
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

| Variable | Description |
| --- | --- |
| `PORT` | Backend server port (e.g., 3000) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT authentication |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| POST | `/api/auth/logout` | Logout and clear token |
| GET | `/api/auth/me` | Get current authenticated user profile |
| POST | `/api/complaints` | Create a new complaint |
| GET | `/api/complaints` | Get all complaints (Admin) |
| GET | `/api/complaints/my` | Get current user's complaints |
| PATCH | `/api/complaints/:id/status` | Update complaint status (Admin) |
| GET | `/api/analytics/department-counts` | Get complaint distribution by department |
| GET | `/api/analytics/status-counts` | Get complaint distribution by status |
| GET | `/api/analytics/monthly-trend` | Get monthly complaint trends |

---

## Future Enhancements

- Push Notifications
- Email Notifications
- Complaint Heatmaps
- AI-based Complaint Categorization
- Mobile App
- Department Performance Reports
- Citizen Feedback System

---

## Contributing

Contributions are always welcome! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License.

---

## Author

**Sampurn Samadder**  
Electronics & Communication Engineering  
IIIT Una  

GitHub: [https://github.com/Sampurn17](https://github.com/Sampurn17)  
LinkedIn: [https://www.linkedin.com/in/sampurn-samadder-841a83283/](https://www.linkedin.com/in/sampurn-samadder-841a83283/)  

*Built with React, Node.js, Express and MongoDB to make civic issue reporting smarter, transparent and more efficient.*
