// src/components/common/Button.js
import React from 'react';
import './CommonStyles.css';

const Button = ({ label, onClick }) => {
    return <button className="button" onClick={onClick}>{label}</button>;
};

export default Button;
