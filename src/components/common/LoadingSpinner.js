// src/components/common/LoadingSpinner.js
import React from 'react';
import './CommonStyles.css';

const LoadingSpinner = () => {
    return (
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    );
};

export default LoadingSpinner;
