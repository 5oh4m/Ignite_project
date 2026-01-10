import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Dashboard/Home';
import AuthPage from './pages/Auth/AuthPage';
import Locator from './pages/Locator/Locator';

import Appointments from './pages/Appointments/Appointments';
import HealthRecords from './pages/Records/HealthRecords';
import LabReports from './pages/Reports/LabReports';
import PatientHistory from './pages/History/PatientHistory';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/locator" element={<Locator />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/records" element={<HealthRecords />} />
        <Route path="/reports" element={<LabReports />} />
        <Route path="/history" element={<PatientHistory />} />
      </Routes>
    </Layout>
  );
}

export default App;
