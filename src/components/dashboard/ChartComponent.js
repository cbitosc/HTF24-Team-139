// src/components/dashboard/ChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import './DashboardStyles.css';

const ChartComponent = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Monthly Budget',
                data: [1000, 2000, 1500, 3000, 2500],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Budget Overview',
            },
        },
    };

    return (
        <div className="chart-container">
            <h2>Budget Overview</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartComponent;
