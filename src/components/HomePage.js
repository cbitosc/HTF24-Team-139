// src/components/HomePage.js
import React from 'react';
import './HomePageStyles.css';
import video from '../assets/video.mp4';
import Header from './layout/Header';
import Footer from './layout/Footer';

function HomePage() {
  return (
    <>
    <Header/>
    <div className="homepage">
      <div className="video-overlay"></div>
      <video className="background-video" autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <div className="hero-section">
          <h1 className="glow-text">Welcome to the Finance Dashboard!</h1>
          <p className="subtitle">Your personal finance management tool.</p>
        </div>
        <div className="features">
          <h2 className="features-title">Features:</h2>
          <ul className="features-list">
            <li className="feature-item">
              <span className="feature-icon">💰</span>
              Track your expenses
            </li>
            <li className="feature-item">
              <span className="feature-icon">📊</span>
              Set budgets
            </li>
            <li className="feature-item">
              <span className="feature-icon">📈</span>
              Analyze spending habits
            </li>
            <li className="feature-item">
              <span className="feature-icon">📑</span>
              View detailed reports
            </li>
          </ul>
          <button className="cta-button">Get Started</button>
        </div>
      </div>
    </div>
    <Footer/>
    
    </>
  );
}

export default HomePage;
