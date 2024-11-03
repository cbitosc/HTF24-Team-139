import React, { useState, useEffect } from 'react';
import { Wallet, CreditCard, ArrowUpRight, ArrowDownLeft,Trash} from 'lucide-react';
import './MyAccounts.css';
import Sidebar from '../layout/Sidebar';

const generateTransactions = () => {
  const transactions = [];
  const types = ['deposit', 'withdrawal'];
  const descriptions = {
    deposit: [
      'Salary Deposit', 
      'Investment Return', 
      'Client Payment',
      'Bonus',
      'Interest Income',
      'Refund',
      'Transfer In'
    ],
    withdrawal: [
      'Grocery Shopping', 
      'Utility Bill', 
      'Restaurant', 
      'Online Purchase',
      'Subscription',
      'Transport',
      'Entertainment'
    ]
  };

  // Generate base amounts for income and expenditure
  let totalIncome = 0;
  let totalExpenditure = 0;
  
  // First, generate income transactions (deposits)
  for (let i = 0; i < 5; i++) { // Generate 5 income transactions
    const amount = (Math.random() * 1500 + 500).toFixed(2); // Random amount between 500-2000
    totalIncome += parseFloat(amount);
    
    transactions.push({
      id: `tr-income-${i}`,
      type: 'deposit',
      amount: amount,
      description: descriptions.deposit[Math.floor(Math.random() * descriptions.deposit.length)],
      date: new Date(Date.now() - Math.random() * 2592000000).toLocaleString()
    });
  }

  // Then, generate expenditure transactions (withdrawals)
  // Ensure total expenditure is less than total income
  const maxExpensePerTransaction = totalIncome * 0.15; // Limit each expense to 15% of total income
  
  for (let i = 0; i < 5; i++) { // Generate 5 expense transactions
    const remainingAllowedExpense = totalIncome * 0.85 - totalExpenditure; // Keep total expenses at max 85% of income
    const maxAmount = Math.min(maxExpensePerTransaction, remainingAllowedExpense);
    const amount = (Math.random() * maxAmount).toFixed(2);
    
    totalExpenditure += parseFloat(amount);
    
    transactions.push({
      id: `tr-expense-${i}`,
      type: 'withdrawal',
      amount: amount,
      description: descriptions.withdrawal[Math.floor(Math.random() * descriptions.withdrawal.length)],
      date: new Date(Date.now() - Math.random() * 2592000000).toLocaleString()
    });
  }

  // Sort transactions by date
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const generateBankName = () => {
  const prefixes = ['Metro', 'Pacific', 'United', 'National', 'Capital'];
  const suffixes = ['Bank', 'Financial', 'Credit Union', 'Trust'];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${
    suffixes[Math.floor(Math.random() * suffixes.length)]
  }`;
};

const MyAccounts = ({ sidebar }) => {
  const [accounts, setAccounts] = useState(() => {
    const savedAccounts = localStorage.getItem('bankAccounts');
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });

  useEffect(() => {
    localStorage.setItem('bankAccounts', JSON.stringify(accounts));
  }, [accounts]);

  const addBankAccount = () => {
    const transactions = generateTransactions();
    const balance = transactions.reduce((sum, transaction) => {
      return sum + (transaction.type === 'deposit' ? 
        parseFloat(transaction.amount) : 
        -parseFloat(transaction.amount)
      );
    }, 0);

    const newAccount = {
      id: `acc-${Date.now()}`,
      name: generateBankName(),
      balance: balance.toFixed(2),
      transactions: transactions
    };
    setAccounts([...accounts, newAccount]);
  };

  const deleteBankAccount = (accountId) => {
    const updatedAccounts = accounts.filter(account => account.id !== accountId);
    setAccounts(updatedAccounts);
  };

  const calculateTotalBalance = () => {
    return accounts.reduce((sum, account) => sum + parseFloat(account.balance), 0).toFixed(2);
  };

  return (
    <div className="accounts-container">
    <Sidebar />
    <div className="main-content">
      <div className="header">
        <h1>Accounts Overview</h1>
        <div className="overview-card">
          <h2>Total Balance: ${calculateTotalBalance()}</h2>
        </div>
      </div>

      <div className="cards-grid">
        <div className="account-card">
          <div className="card-header">
            <div className="card-title">
              <Wallet />
              Cash Wallet
            </div>
          </div>
          <div className="card-content">
            <div className="balance">$0.00 USD</div>
          </div>
        </div>

        <button className="add-account-button" onClick={addBankAccount}>
          + Add Bank Account
        </button>
      </div>

      <div className="cards-grid">
        {accounts.map(account => (
          <div key={account.id} className="account-card">
            <div className="card-header">
              <div className="card-title">
                <CreditCard />
                {account.name}
              </div>
              <button className="delete-account-button" onClick={() => deleteBankAccount(account.id)}>
                <Trash className="delete-icon" />
                Delete
              </button>
            </div>
            <div className="card-content">
              <div className="balance">${account.balance} USD</div>
              <div className="transactions-list">
                {account.transactions.map(transaction => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-info">
                      <div className="transaction-icon">
                        {transaction.type === 'deposit' ? (
                          <ArrowUpRight color="#10b981" />
                        ) : (
                          <ArrowDownLeft color="#ef4444" />
                        )}
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-description">{transaction.description}</div>
                        <div className="transaction-date">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`amount-${transaction.type}`}>
                      ${transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default MyAccounts;