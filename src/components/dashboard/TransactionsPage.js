// src/components/dashboard/TransactionsPage.js
import React, { useState } from 'react';
import './DashboardStyles.css';

const TransactionsPage = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const transactions = [
    {
      id: 1,
      type: 'expense',
      category: 'Shopping',
      merchant: 'Amazon',
      amount: -89.99,
      date: '2024-02-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'income',
      category: 'Salary',
      merchant: 'Company Inc',
      amount: 3500.00,
      date: '2024-02-01',
      status: 'completed'
    },
    // Add more sample transactions...
  ];

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <h1>Transactions</h1>
        
        <div className="transactions-actions">
          <div className="filter-group">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Transactions</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
          
          <button className="add-transaction-btn">
            + Add Transaction
          </button>
        </div>
      </div>

      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Merchant</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>
                  <span className="category-tag">{transaction.category}</span>
                </td>
                <td>{transaction.merchant}</td>
                <td>
                  <span className={`status-badge ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className={transaction.type === 'income' ? 'amount positive' : 'amount negative'}>
                  {transaction.type === 'income' ? '+' : '-'}
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit">✏️</button>
                    <button className="action-btn delete">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;