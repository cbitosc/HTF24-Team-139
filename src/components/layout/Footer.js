// src/components/layout/Footer.js
import React from 'react';
import './LayoutStyles.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
                <div className="social-links">
                    <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
