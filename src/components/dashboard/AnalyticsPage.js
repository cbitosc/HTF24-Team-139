import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import './Analytics.css';

const AnalyticsPage = () => {
  const [accounts, setAccounts] = useState(() => {
    const savedAccounts = localStorage.getItem('bankAccounts');
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });

  // Process transactions for analytics
  const processTransactions = () => {
    // Get all transactions from all accounts
    const allTransactions = accounts.flatMap(account => 
      account.transactions.map(t => ({
        ...t,
        amount: parseFloat(t.amount),
        date: new Date(t.date).toISOString().split('T')[0] // Convert to YYYY-MM-DD
      }))
    );

    // Group by date and type
    const groupedData = allTransactions.reduce((acc, curr) => {
      const date = curr.date;
      if (!acc[date]) {
        acc[date] = { date, income: 0, expenditure: 0 };
      }
      if (curr.type === 'deposit') {
        acc[date].income += curr.amount;
      } else {
        acc[date].expenditure += curr.amount;
      }
      return acc;
    }, {});

    // Convert to array and sort by date
    return Object.values(groupedData)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const calculateTotals = () => {
    const allTransactions = accounts.flatMap(account => account.transactions);
    return allTransactions.reduce(
      (acc, curr) => {
        const amount = parseFloat(curr.amount);
        if (curr.type === 'deposit') {
          acc.totalIncome += amount;
        } else {
          acc.totalExpenditure += amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpenditure: 0 }
    );
  };

  const chartData = processTransactions();
  const { totalIncome, totalExpenditure } = calculateTotals();

  return (
    <div className="analytics-container">
      <Sidebar />
      <div className="analytics-content">
        <h1 className="analytics-header">Financial Analytics</h1>
        
        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-card-header">
              <h3 className="summary-card-title">Total Income</h3>
              <TrendingUp className="icon-income" />
            </div>
            <div className="summary-card-amount amount-income">
              ${totalIncome.toFixed(2)}
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-card-header">
              <h3 className="summary-card-title">Total Expenditure</h3>
              <TrendingDown className="icon-expense" />
            </div>
            <div className="summary-card-amount amount-expense">
              ${totalExpenditure.toFixed(2)}
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-card-header">
              <h3 className="summary-card-title">Net Balance</h3>
              <DollarSign className="icon-balance" />
            </div>
            <div className="summary-card-amount amount-balance">
              ${(totalIncome - totalExpenditure).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-container">
          <div className="chart-card">
            <h3 className="chart-title">Income vs Expenditure Over Time</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#10b981" 
                    name="Income"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenditure" 
                    stroke="#ef4444" 
                    name="Expenditure"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Monthly Comparison</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#10b981" name="Income" />
                  <Bar dataKey="expenditure" fill="#ef4444" name="Expenditure" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;