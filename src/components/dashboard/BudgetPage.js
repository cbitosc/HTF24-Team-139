import React, { useState, useEffect } from 'react';
import { Wallet, Plus, Trash, AlertCircle } from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import "./Budgets.css"

const BudgetPage = () => {
  const [budgets, setBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem('budgets');
    return savedBudgets ? JSON.parse(savedBudgets) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({
    name: '',
    amount: '',
    category: 'groceries'
  });

  // Get transactions from localStorage
  const getTransactions = () => {
    const bankAccounts = JSON.parse(localStorage.getItem('bankAccounts') || '[]');
    const cashWallet = JSON.parse(localStorage.getItem('cashWallet') || '{"transactions": []}');
    
    // Combine all transactions
    const allTransactions = [
      ...bankAccounts.flatMap(account => account.transactions),
      ...cashWallet.transactions
    ];

    return allTransactions.filter(t => t.type === 'withdrawal');
  };

  // Categories for budgets
  const categories = [
    'groceries',
    'utilities',
    'entertainment',
    'transport',
    'dining',
    'shopping',
    'healthcare',
    'others'
  ];

  // Save budgets to localStorage
  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const addBudget = () => {
    if (!newBudget.name || !newBudget.amount) return;

    const budget = {
      id: `budget-${Date.now()}`,
      name: newBudget.name,
      amount: parseFloat(newBudget.amount),
      category: newBudget.category,
      createdAt: new Date().toISOString()
    };

    setBudgets([...budgets, budget]);
    setNewBudget({ name: '', amount: '', category: 'groceries' });
    setIsModalOpen(false);
  };

  const deleteBudget = (budgetId) => {
    setBudgets(budgets.filter(budget => budget.id !== budgetId));
  };

  const calculateSpentAmount = (category) => {
    const transactions = getTransactions();
    return transactions
      .filter(t => t.description.toLowerCase().includes(category.toLowerCase()))
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  const getBudgetProgress = (budget) => {
    const spent = calculateSpentAmount(budget.category);
    const remaining = budget.amount - spent;
    const percentage = (spent / budget.amount) * 100;

    return {
      spent: spent.toFixed(2),
      remaining: remaining.toFixed(2),
      percentage: Math.min(percentage, 100).toFixed(1)
    };
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return '#ef4444';  // red
    if (percentage >= 70) return '#f59e0b';  // yellow
    return '#22c55e';  // green
  };

  return (
    <div className="bdg-page-wrapper">
      <Sidebar />
      <div className="bdg-main-content">
        <div className="bdg-header-container">
          <h1 className="bdg-page-title">Budget Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bdg-new-button"
          >
            <Plus size={20} />
            Create Budget
          </button>
        </div>

        <div className="bdg-cards-grid">
          {budgets.map(budget => {
            const progress = getBudgetProgress(budget);
            const progressColor = getProgressColor(parseFloat(progress.percentage));

            return (
              <div key={budget.id} className="bdg-card">
                <div className="bdg-card-header">
                  <div>
                    <h3 className="bdg-card-title">{budget.name}</h3>
                    <p className="bdg-card-category">{budget.category}</p>
                  </div>
                  <button
                    onClick={() => deleteBudget(budget.id)}
                    className="bdg-delete-btn"
                  >
                    <Trash size={18} />
                  </button>
                </div>

                <div className="bdg-card-details">
                  <div>Budget: ${budget.amount.toFixed(2)}</div>
                  <div>Spent: ${progress.spent}</div>
                  <div>Remaining: ${progress.remaining}</div>
                </div>

                <div className="bdg-progress-container">
                  <div
                    className="bdg-progress-bar"
                    style={{
                      width: `${progress.percentage}%`,
                      backgroundColor: progressColor
                    }}
                  ></div>
                </div>
                <div className="bdg-progress-text">
                  {progress.percentage}%
                </div>

                {parseFloat(progress.percentage) >= 90 && (
                  <div className="bdg-alert">
                    <AlertCircle size={16} />
                    <span>Budget almost depleted!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isModalOpen && (
          <div className="bdg-modal-overlay">
            <div className="bdg-modal">
              <h2 className="bdg-modal-title">Create New Budget</h2>

              <div>
                <input
                  type="text"
                  className="bdg-form-field"
                  value={newBudget.name}
                  onChange={(e) =>
                    setNewBudget(prev => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Budget Name"
                />
                <select
                  className="bdg-form-field"
                  value={newBudget.category}
                  onChange={(e) =>
                    setNewBudget(prev => ({
                      ...prev,
                      category: e.target.value
                    }))
                  }
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="bdg-form-field"
                  value={newBudget.amount}
                  onChange={(e) =>
                    setNewBudget(prev => ({
                      ...prev,
                      amount: e.target.value
                    }))
                  }
                  placeholder="Budget Amount"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="bdg-button-group">
                <button onClick={addBudget} className="bdg-submit-btn">
                  Create Budget
                </button>
                <button onClick={() => setIsModalOpen(false)} className="bdg-cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetPage;