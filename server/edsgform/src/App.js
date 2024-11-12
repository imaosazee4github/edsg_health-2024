import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
import Dashboard from './pages/Dashboard.js';
import CreateQuiz from './pages/CreateQuiz.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import PasscodeManagement from './pages/PasscodeManagement.js';
import AnalyticsPage from './pages/analyticsPage/AnalyticsPage.js';
import PasscodeAccessPage from './pages/passcodeAccess/PasscodeAccessPage.js';


function App() {
  return (
    <Router>

      <div className="App">
        <Routes>
          <Route path="/" element={<Logout />} />
          <Route path="/passwd" element={<PasscodeAccessPage />} />
          <Route path="/dashboard" element={<Dashboard />} />      
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passcode-management" element={<PasscodeManagement />} />
          <Route path="/analytics-page" element={<AnalyticsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;