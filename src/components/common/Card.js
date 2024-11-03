// src/components/common/Card.js
import React from 'react';
import './CommonStyles.css';

const Card = ({ title, children }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <div>{children}</div>
        </div>
    );
};

export default Card;
