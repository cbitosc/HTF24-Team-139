import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderStyles.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          BudgetBuddy
        </Link>

        <nav className="nav-links">
          <div className="left-nav">
            <Link to="/" className="nav-link">Home</Link>

          </div>

          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
