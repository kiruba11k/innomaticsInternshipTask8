import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './PieChart.css'; // Import the CSS file for styling

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ labels, data }) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Students Distribution',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
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
                text: 'Students Per Class Distribution',
            },
        },
    };

    return (
        <div className="pie-chart-container">
            <Pie options={options} data={chartData} />
        </div>
    );
}

export default PieChart;
