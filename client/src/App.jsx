import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Dashboard/Home';
import AuthPage from './pages/Auth/AuthPage';
import Locator from './pages/Locator/Locator';
import Appointments from './pages/Appointments/Appointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import About from './pages/About/About';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import { useAuth } from './context/AuthContext';

import HealthRecords from './pages/Records/HealthRecords';
import LabReports from './pages/Reports/LabReports';
import PatientHistory from './pages/History/PatientHistory';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected Routes */}
      <Route element={<Layout />}>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Patient Routes */}
        <Route element={<ProtectedRoute allowedRoles={['patient', 'admin']} />}>
          <Route path="/locator" element={<Locator />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/records" element={<HealthRecords />} />
          <Route path="/reports" element={<LabReports />} />
          <Route path="/history" element={<PatientHistory />} />
        </Route>

        {/* Doctor Routes */}
        <Route element={<ProtectedRoute allowedRoles={['doctor', 'admin']} />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
