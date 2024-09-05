import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { BriefcaseIcon, UserGroupIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardCard = ({ icon, title, value }) => (
  <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-4 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
    <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
      <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
        {icon}
      </svg>
    </div>
    <div className="text-right">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm">{title}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [reservationCount, setReservationCount] = useState(0);
  const [queryCount, setQueryCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:8081/staff/count');
        console.log('API Response:', response);
       if (response.data !== undefined) {
          setUserCount(response.data);   } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };
  
    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchReservationCount = async () => {
      try {
        const response = await axios.get('http://localhost:8081/reservation/count');
        console.log('API Response:', response);
       if (response.data !== undefined) {
          setReservationCount(response.data);   } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };
  
    fetchReservationCount();
  }, []);
  
  useEffect(() => {
    const fetchQueryCount = async () => {
      try {
        const response = await axios.get('http://localhost:8081/query/count');
        console.log('API Response:', response);
       if (response.data !== undefined) {
          setQueryCount(response.data);   } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };
  
    fetchQueryCount();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/user'); // Ensure this is the correct API endpoint
        const data = await response.json();
  
        console.log('API Response:', data); // Log the response to see its structure
  
        // Assuming your data is an array of objects with `date` and `numberOfOrders` properties
        const labels = data.map(item => item.date); // Extract dates for labels
        const ordersData = data.map(item => item.numberOfOrders); // Extract order numbers for the dataset
  
        // Update the chart data
        setChartData({
          labels,
          datasets: [
            {
              label: 'Orders Trend',
              data: ordersData,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error); 
      } finally {
        setLoading(false); 
      }
    };
  
    fetchData(); 
  }, []); 
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6 shadow-md rounded-lg p-4 mt-6 relative w-[1000px]">
      <div className="flex items-center space-x-3 mb-6">
        <BriefcaseIcon className="h-8 w-8 text-gray-800" />
        <h1 className="text-3xl font-bold text-gray-800">Staff Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white shadow-md rounded-lg p-4 mt-6 text-center">
        <DashboardCard
          icon={<BriefcaseIcon className="h-8 w-8 text-gray-800" />}
          title="Users"
          value={userCount}
        />
        <DashboardCard
          icon={<UserGroupIcon className="h-8 w-8 text-gray-800" />}
          title="Reservations"
          value={reservationCount}
        />
        <DashboardCard
          icon={<path strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
          title="Pending reservations"
          value="$11,257"
        />
        <DashboardCard
          icon={<path strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
          title="Quries"
          value={queryCount}
        />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>

      <footer className="bg-white shadow-md rounded-lg p-4 mt-6 text-center">
        <p className="text-gray-600 text-sm">© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};



export default Dashboard;
