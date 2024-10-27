import React from 'react';
import { NavLink } from 'react-router-dom';
import './LayoutStyles.css';
import "./Sidebar.css"

const Sidebar = () => {
  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '💸', label: 'myaccounts', path: '/myaccounts' },
    { icon: '📈', label: 'Analytics', path: '/analytics' },
    { icon: '💰', label: 'Budget', path: '/budgets' },
    { icon: '👤', label: 'Profile', path: '/profile' },
    { icon: '⚙', label: 'Settings', path: '/settings' },
    { icon: '🏆', label: 'Gamification', path: '/gamification' } // New gamification item
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
      
      <div className="sidebar-footer">
        <button className="help-button">
          <span className="help-icon">❓</span>
          <span>Help & Support</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
