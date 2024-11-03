// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; // Updated path
import DashboardPage from './components/dashboard/DashboardPage'; // Updated path
import LoginPage from './components/auth/LoginPage'; // Ensure this file exists
import SignupPage from './components/auth/SignupPage'; // Ensure this file exists
// Removed NotFoundPage import as it's no longer used
import './styles/global.css';
import BudgetPage from './components/dashboard/BudgetPage';
import MyAccounts from './components/dashboard/MyAccounts';
import AnalyticsPage from './components/dashboard/AnalyticsPage';
import Gamification from './components/Gamification/Gamification';
import ProfilePage from './components/profile/ProfilePage';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          <Route path="/budgets" element={<BudgetPage />} />
          
          <Route path="/myaccounts" element={<MyAccounts/>} />
          <Route path="/analytics" element={<AnalyticsPage/>} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/profile" element={<ProfilePage />} />
          

          <Route path="*" element={<DashboardPage />} /> {/* Redirect to DashboardPage */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
