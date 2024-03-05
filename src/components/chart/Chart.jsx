import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Some Dummy Text',
        },
    },
    scales: {
        x: {
            beginAtZero: true,
        },
        y: {
            beginAtZero: true,
        },
    },
};

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Present 1',
            data: [11, 22, 33, 44, 55, 66, 77, 88, 99, 120, 22, 33],
            backgroundColor: '#e8e8e8',
            barThickness: 10,

        },
        {
            label: 'Present 2',
            data: [11, 22, 33, 44, 55, 66, 77, 88, 99, 11, 22, 33],
            backgroundColor: '#439D91',
            barThickness: 10,

        },
    ],
};

const Chart = () => {
    return (
        <div className="chart-container">
            <Bar options={options} data={data} />
        </div>
    );
};

export default Chart;
