// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './components/dashboard/DashboardPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import NotFoundPage from './components/common/NotFoundPage';
import BudgetPage from './components/dashboard/BudgetPage';
import TransactionsPage from "./components/dashboard/MyAccounts"
import HomePage from './components/HomePage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/budgets" element={<BudgetPage />} />
            <Route path='/myaccounts' element={<TransactionsPage/>}/>
        </Routes>
    );
};

export default AppRoutes;
