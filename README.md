<div align="center">

# 🏥 MedLink - Healthcare Management Platform

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>

**A modern, full-stack healthcare management system designed to streamline hospital operations, patient care, and emergency services.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Seeded Accounts](#-seeded-accounts)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**MedLink** is a comprehensive healthcare management platform that bridges the gap between patients, doctors, and hospital administrators. Built with the MERN stack, it offers real-time appointment scheduling, medical record management, emergency hospital locator, and seamless communication between all stakeholders in the healthcare ecosystem.

### 🎯 Key Highlights

- **🔐 Role-Based Access Control**: Separate dashboards for Patients, Doctors, and Admins
- **🗓️ Intelligent Appointment System**: Book, reschedule, and manage appointments with ease
- **📁 Digital Medical Records**: Secure upload and management of prescriptions, reports, and medical history
- **🚑 Emergency Hospital Locator**: Real-time location-based hospital search with Google Maps integration
- **⏱️ Medical Timeline**: Visual representation of patient health journey
- **📊 Analytics Dashboard**: Comprehensive insights for doctors and administrators

---

## ✨ Features

### 👤 Patient Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Profile Management**: Update personal information and medical preferences
- **Appointment Booking**: Search doctors, book appointments, and select preferred time slots
- **Appointment Rescheduling**: Request date/time changes for existing appointments
- **Medical Records Access**: View and download personal medical records, prescriptions, and test results
- **Medical Timeline**: Interactive visual timeline of health history (diagnoses, surgeries, vaccinations, medications)
- **Hospital Locator**: Find nearest hospitals using geolocation with Google Maps fallback
- **Emergency SOS**: Quick access to nearby emergency facilities

### 👨‍⚕️ Doctor Features
- **Appointment Management**: View pending, confirmed, and completed consultations
- **Patient Directory**: Access complete list of registered patients
- **Clinical Notes**: Add diagnosis and treatment notes during consultations
- **Medical Record Upload**: Upload prescriptions, lab reports, and medical documents for patients
- **Timeline Event Creation**: Add medical events (diagnosis, surgery, medication, vaccination) to patient timeline
- **Appointment Actions**: Complete or update consultation status

### 🛡️ Admin Features
- **Appointment Approval System**: Review and approve/reject pending appointments
- **Patient Directory**: View all registered patients with detailed information
- **Analytics Dashboard**: Monitor system statistics (users, appointments, active doctors)
- **Hospital Management**: Manage hospital information and bed availability
- **User Management**: Oversee all users in the system

### 🌐 Global Features
- **Responsive Design**: Fully responsive UI for desktop, tablet, and mobile devices
- **Real-time Updates**: React Query for efficient data fetching and caching
- **Interactive Maps**: Leaflet integration for hospital location visualization
- **File Management**: Secure file upload and download system
- **Beautiful UI**: Modern, glassmorphic design with smooth animations
- **Toast Notifications**: Real-time feedback for user actions

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **State Management**: React Query (TanStack Query) for server state
- **Routing**: React Router v6
- **Styling**: Vanilla CSS with custom design system
- **UI Components**: Custom components with Lucide React icons
- **Maps**: Leaflet & React-Leaflet for interactive maps
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (Access & Refresh Tokens)
- **File Upload**: Multer
- **Security**: Helmet, CORS
- **Environment**: dotenv
- **PDF Generation**: PDFKit

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**: ESLint
- **API Testing**: (Recommended: Postman/Insomnia)

---

## 📁 Project Structure

```
Ignite_project/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── assets/           # Images, icons, and static assets
│   │   ├── components/       # Reusable React components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── features/    # Feature-specific components
│   │   │   └── layout/      # Layout components (Navbar, Footer)
│   │   ├── context/         # React Context providers
│   │   ├── pages/           # Page components (routes)
│   │   │   ├── Admin/       # Admin dashboard
│   │   │   ├── Auth/        # Login/Register pages
│   │   │   ├── Doctor/      # Doctor dashboard
│   │   │   ├── Patient/     # Patient dashboard
│   │   │   ├── Appointments/
│   │   │   ├── History/     # Medical timeline
│   │   │   ├── Locator/     # Hospital finder
│   │   │   └── Records/     # Medical records
│   │   ├── services/        # API service layer
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Public static files
│   └── package.json
│
├── server/                   # Backend Node.js application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   │   └── db.js        # MongoDB connection
│   │   ├── controllers/     # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── appointmentController.js
│   │   │   ├── recordController.js
│   │   │   ├── timelineController.js
│   │   │   ├── hospitalController.js
│   │   │   └── adminController.js
│   │   ├── middleware/      # Custom middleware
│   │   │   └── authMiddleware.js
│   │   ├── models/          # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Doctor.js
│   │   │   ├── Appointment.js
│   │   │   ├── Record.js
│   │   │   ├── TimelineEvent.js
│   │   │   └── Hospital.js
│   │   ├── routes/          # Express routes
│   │   ├── uploads/         # Uploaded files storage
│   │   ├── server.js        # Express app setup
│   │   └── seed.js          # Database seeder
│   └── package.json
│
├── MONGODB_SETUP.md         # MongoDB setup guide
└── README.md                # This file
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (v5 or higher) - Local or Atlas cluster

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/medlink.git
cd medlink
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# - Set MONGODB_URI to your MongoDB connection string
# - Set JWT_SECRET and JWT_REFRESH_SECRET
# - Set PORT (default: 5001)

# Seed the database with initial data
npm run seed

# Start the development server
npm run dev
```

### Step 3: Frontend Setup

Open a new terminal window:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your backend URL
# VITE_API_URL=http://localhost:5001/api

# Start the development server
npm run dev
```

### Step 4: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001/api

---

## 📖 Usage

### First-Time Setup

1. **Start MongoDB**: Ensure your MongoDB server is running
2. **Seed Database**: Run `npm run seed` in the server directory to populate initial data
3. **Start Servers**: Run both backend and frontend development servers

### Logging In

Use the seeded accounts (see [Seeded Accounts](#-seeded-accounts) section) or register a new patient account.

### Patient Workflow

1. **Register/Login** → Navigate to `/login` or `/register`
2. **Book Appointment** → Go to Appointments page, select doctor and time slot
3. **View Medical Records** → Access your records in the Health Records section
4. **Check Medical History** → View your medical timeline in Patient History
5. **Find Hospitals** → Use the Hospital Locator for emergency services

### Doctor Workflow

1. **Login** → Use doctor credentials
2. **View Appointments** → See pending consultations in Dashboard
3. **Conduct Consultation** → Select patient, add notes
4. **Upload Reports** → Upload prescriptions and lab reports
5. **Update Timeline** → Add medical events to patient timeline
6. **Complete Appointment** → Mark consultation as complete

### Admin Workflow

1. **Login** → Use admin credentials
2. **Approve Appointments** → Review and approve/reject pending requests
3. **View Patients** → Access complete patient directory
4. **Monitor System** → View analytics and statistics

---

## 📡 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient",
  "phone": "+1234567890"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "user": { ... },
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

### Appointment Endpoints

#### Get Appointments
```http
GET /appointments
Authorization: Bearer {token}

Query Parameters:
- status: pending | confirmed | completed | cancelled
```

#### Create Appointment
```http
POST /appointments
Authorization: Bearer {token}
Content-Type: application/json

{
  "doctor": "doctor_id",
  "date": "2024-01-15T10:00:00Z",
  "reason": "Regular checkup"
}
```

#### Update Appointment Status
```http
PUT /appointments/:id/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "confirmed",
  "remarks": "Approved by admin"
}
```

### Medical Records Endpoints

#### Upload Record
```http
POST /records/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

Fields:
- file: File
- title: String
- type: lab_report | prescription | scan | other
- description: String
- patientId: String (for doctors/admins)
```

#### Get Patient Records
```http
GET /records/patient/:patientId
Authorization: Bearer {token}
```

#### Download Record
```http
GET /records/download/:recordId
Authorization: Bearer {token}
```

### Timeline Endpoints

#### Get Patient Timeline
```http
GET /timeline/patient/:patientId
Authorization: Bearer {token}
```

#### Add Timeline Event
```http
POST /timeline/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "patientId": "patient_id",
  "eventType": "diagnosis | surgery | medication | vaccination",
  "title": "Event Title",
  "description": "Detailed description",
  "date": "2024-01-15T00:00:00Z"
}
```

### Hospital Endpoints

#### Get Nearby Hospitals
```http
GET /hospitals
Authorization: Bearer {token}

Query Parameters:
- lat: Latitude
- lng: Longitude
- radius: Search radius in km (default: 50)
- search: Search query
```

### Admin Endpoints

#### Get All Patients
```http
GET /admin/patients
Authorization: Bearer {token}
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/medlink
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medlink

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

### Frontend (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5001/api

# Optional: Other configurations
VITE_APP_NAME=MedLink
```

---

## 🔑 Seeded Accounts

After running `npm run seed`, the following accounts will be available:

### Admin Account
```
Email: admin@medlink.com
Password: adminpassword123
Role: Administrator
```

**Permissions**: Approve appointments, view all patients, system management

### Doctor Account
```
Email: doctor@medlink.com
Password: doctorpassword123
Name: Dr. John Smith
Specialization: Cardiology
```

**Permissions**: View appointments, access patient records, upload documents, manage timeline

### Patient Account
You can register a new patient account through the registration page, or create one via the API.

---

## 📸 Screenshots

### Patient Dashboard
*Modern, intuitive interface for patients to manage their health journey*

### Doctor Dashboard
*Comprehensive consultation management with patient directory*

### Medical Timeline
*Interactive visual timeline of patient health history*

### Hospital Locator
*Real-time location-based hospital search with map integration*

### Appointment Booking
*Streamlined appointment scheduling system*

---

## 🤝 Contributing

We welcome contributions to MedLink! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and structure
- Write clear, descriptive commit messages
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly
- Ensure all existing tests pass

### Code Style

- **Frontend**: Follow React best practices, use functional components with hooks
- **Backend**: Use async/await for asynchronous operations, proper error handling
- **Naming**: Use camelCase for variables/functions, PascalCase for components
- **Comments**: Add JSDoc comments for functions

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? Please open an issue on GitHub with:

- **Bug Reports**: Steps to reproduce, expected vs actual behavior, screenshots
- **Feature Requests**: Clear description, use cases, potential implementation

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing frontend framework
- **MongoDB** - For the flexible NoSQL database
- **Leaflet** - For the interactive mapping library
- **Lucide** - For the beautiful icon set
- **TanStack Query** - For excellent server state management

---

## 📞 Support

For questions, issues, or support:

- **Email**: support@medlink.com
- **Documentation**: [docs.medlink.com](https://docs.medlink.com)
- **Community**: [community.medlink.com](https://community.medlink.com)

---

<div align="center">

**Built with ❤️ by the MedLink Team**

⭐ Star us on GitHub if you find this project useful!

[Back to Top](#-medlink---healthcare-management-platform)

</div>
