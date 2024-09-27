//MUI Import
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

// Testing data
const data = {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    datasets: [
        {
            label: 'Quarterly Quarter',
            data: [750, 250, 500, 750, 500, 750, 500, 750, 500, 750], 
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
            label: 'Midyear Membership',
            data: [500, 750, 300, 400, 500, 600, 700, 800, 500, 600],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
            label: 'Annual Advantage',
            data: [300, 400, 500, 600, 700, 800, 900, 300, 400, 500],
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Sale Report',
        },
    },
    scales: {
        x: {
            type: 'category',
            barPercentage: 0.7,
            categoryPercentage: 0.7,
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: '$(thousands)',
            },
        },
    },
};

// =========== Start Report Bar Graph ============
const ReportChart = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '500px',
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
// =========== End Report Bar Graph ============