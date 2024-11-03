import React, { useState } from 'react';
import './DashboardStyles.css';
import Sidebar from '../layout/Sidebar';
function DashboardPage() {
  // State variables
  const [transactions, setTransactions] = useState([
    { date: '2024-10-01', description: 'Grocery Shopping', amount: -50, category: 'Food' },
    { date: '2024-10-02', description: 'Salary', amount: 2000, category: 'Income' },
    { date: '2024-10-03', description: 'Coffee', amount: -3.5, category: 'Food' },
  ]);
  const [goals, setGoals] = useState([
    { goal: 'Emergency Fund', progress: 80 },
    { goal: 'Vacation', progress: 45 },
    { goal: 'New Car', progress: 25 },
  ]);
  const [upcomingBills, setUpcomingBills] = useState([
    { date: '2024-10-10', description: 'Electricity Bill', amount: 100 },
    { date: '2024-10-15', description: 'Water Bill', amount: 30 },
    { date: '2024-10-20', description: 'Internet Bill', amount: 45 },
  ]);
  const [tips] = useState([
    "Set a monthly savings goal to build an emergency fund.",
    "Review your subscriptions and cancel any unused ones.",
    "Automate your savings for better financial discipline.",
  ]);
  const [savingsTracker, setSavingsTracker] = useState([
    { month: 'January', amount: 300 },
    { month: 'February', amount: 500 },
    { month: 'March', amount: 400 },
    { month: 'April', amount: 200 },
  ]);
  const [expenseBreakdown] = useState([
    { category: 'Food', amount: 300 },
    { category: 'Rent', amount: 700 },
    { category: 'Utilities', amount: 100 },
    { category: 'Entertainment', amount: 150 },
  ]);
  
  const [budgets, setBudgets] = useState({
    totalBudget: 1500,
    spent: 1200,
    remaining: 300,
  });

  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    amount: '',
    category: 'Food', // Default category
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    const { date, description, amount, category } = newTransaction;
    if (date && description && amount) {
      setTransactions((prev) => [
        ...prev,
        { date, description, amount: parseFloat(amount), category },
      ]);
      setNewTransaction({ date: '', description: '', amount: '', category: 'Food' });
    }
  };

  // Function to delete a transaction
  const handleDeleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  return (
    <div className='outer-dashboard' >
    <Sidebar/>

    <div className="dashboard-page">
      <h1>Finance Dashboard</h1>
      <div className="dashboard-sections">
        <div className="card account-summary">
          <h2>Account Summary</h2>
          <p><strong>Balance:</strong> $5,000</p>
          <p><strong>Monthly Income:</strong> $2,000</p>
          <p><strong>Monthly Expenses:</strong> {budgets.spent}</p>
        </div>

        <div className="card recent-transactions">
          <h2>Recent Transactions</h2>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index} className="transaction-item">
                <span>{transaction.date}</span>
                <span>{transaction.description}</span>
                <span className={transaction.amount < 0 ? 'expense' : 'income'}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
                <button onClick={() => handleDeleteTransaction(index)}>Delete</button> {/* Delete button */}
              </li>
            ))}
          </ul>
        </div>

        <div className="card transaction-form">
          <h2>Add Transaction</h2>
          <form onSubmit={handleTransactionSubmit}>
            <input
              type="date"
              name="date"
              value={newTransaction.date}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newTransaction.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
              required
            />
            <select
              name="category"
              value={newTransaction.category}
              onChange={handleInputChange}
            >
              <option value="Food">Food</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Income">Income</option>
              {/* Add more categories as needed */}
            </select>
            <button type="submit">Add Transaction</button>
          </form>
        </div>

        <div className="card savings-tracker">
          <h2>Savings Tracker</h2>
          <ul>
            {savingsTracker.map((savings, index) => (
              <li key={index}>
                <span>{savings.month}</span>
                <span>${savings.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card expense-breakdown">
          <h2>Expense Breakdown</h2>
          <ul>
            {expenseBreakdown.map((expense, index) => (
              <li key={index}>
                <span>{expense.category}</span>
                <span>${expense.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card budget-overview">
          <h2>Budget Overview</h2>
          <p><strong>Total Budget:</strong> ${budgets.totalBudget}</p>
          <p><strong>Spent:</strong> ${budgets.spent}</p>
          <p><strong>Remaining:</strong> ${budgets.remaining}</p>
        </div>

        <div className="card goals-tracking">
          <h2>Financial Goals</h2>
          <ul>
            {goals.map((goal, index) => (
              <li key={index}>
                <span>{goal.goal}</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${goal.progress}%` }}>{goal.progress}%</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card upcoming-bills">
          <h2>Upcoming Bills</h2>
          <ul>
            {upcomingBills.map((bill, index) => (
              <li key={index} className="bill-item">
                <span>{bill.date}</span>
                <span>{bill.description}</span>
                <span>${bill.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card insights-tips">
          <h2>Financial Insights</h2>
          <ul>
            {tips.map((tip, index) => (
              <li key={index} className="tip-item">{tip}</li>
            ))}
          </ul>
        </div>

        <div className="card profile-settings">
          <h2>Settings</h2>
          <p><a href="/profile">Profile Settings</a></p>
          <p><a href="/preferences">Preferences</a></p>
        </div>
      </div>
    </div>
    </div>
    
  );
  
}

export default DashboardPage;
