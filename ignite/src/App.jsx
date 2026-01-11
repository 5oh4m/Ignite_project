import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Dashboard/Home';
import AuthPage from './pages/Auth/AuthPage';
import Locator from './pages/Locator/Locator';

import Appointments from './pages/Appointments/Appointments';
import HealthRecords from './pages/Records/HealthRecords';
import LabReports from './pages/Reports/LabReports';
import PatientHistory from './pages/History/PatientHistory';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />

      <Route path="/*" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Layout onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/locator" element={<Locator />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/records" element={<HealthRecords />} />
              <Route path="/reports" element={<LabReports />} />
              <Route path="/history" element={<PatientHistory />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
