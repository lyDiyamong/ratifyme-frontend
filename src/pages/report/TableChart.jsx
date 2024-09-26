import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const data = {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], // Your x-axis labels
    datasets: [
        {
            label: 'Quarterly Quarter', // First set of data
            data: [750, 250, 500, 750, 500, 750, 500, 750, 500, 750], // Example data for the first bar
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
        },
        {
            label: 'Midyear Membership', // Second set of data
            data: [500, 750, 300, 400, 500, 600, 700, 800, 500, 600],
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        },
        {
            label: 'Annual Advantage', // Third set of data
            data: [300, 400, 500, 600, 700, 800, 900, 300, 400, 500],
            backgroundColor: 'rgba(255, 159, 64, 0.6)', // Bar color
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows full control over width and height
    plugins: {
        legend: {
            position: 'right', // Position of the legend
        },
        title: {
            display: true,
            text: 'Sale Report', // Title of the chart
        },
    },
    scales: {
        x: {
            type: 'category',
            barPercentage: 0.7, // Controls the width of the bars (increase this for bigger bars)
            categoryPercentage: 0.7, // Controls the space between bars (reduce this for wider bars)
        },
        y: {
            beginAtZero: true, // y-axis starts at 0
            title: {
                display: true,
                text: '$(thousands)', // y-axis label
            },
        },
    },
};

const ReportChart = () => {
    return (
        <div
            style={{
                width: '100%', // Full width
                height: '500px', // Fixed height
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px',
            }}
        >
            <Bar data={data} options={options} />
        </div>
    );
};

export default ReportChart;
