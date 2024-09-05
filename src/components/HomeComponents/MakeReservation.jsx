import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useLocation } from "react-router-dom";

const Reservation = () => {
    const location = useLocation();
    const [serviceName, setServiceName] = useState(location.state?.serviceName || '');
    const [userName, setUserName] = useState('');
    const [people, setPeople] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([
        "10:15 AM", "10:30 AM", "10:45 AM", "12:00 PM", "12:15 PM",
        "12:30 PM", "01:00 PM", "01:15 PM", "01:30 PM", "02:00 PM"
    ]);
    const [reservedTimes, setReservedTimes] = useState('');
    const [loading, setLoading] = useState(false);
    const [allServices, setAllServices] = useState([]);

    
  useEffect(() => {
    if (date && serviceName) {
        const fetchBookedTimes = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8081/reservations", {
                    params: { serviceName, date }
                });
                
                // Convert booked times to h:mm A format
                const booked = response.data.map(res => {
                    const [hours, minutes] = res.time.split(':');
                    let period = 'AM';
                    let hours12 = parseInt(hours, 10);
                    
                    if (hours12 >= 12) {
                        period = 'PM';
                        hours12 = hours12 > 12 ? hours12 - 12 : hours12;
                    } else if (hours12 === 0) {
                        hours12 = 12;
                    }

                    return `${hours12}:${minutes} ${period}`;
                });

                console.log("Booked Times:", booked);
                setReservedTimes(booked);
            } catch (error) {
                console.error("Error fetching booked times:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookedTimes();
    }
}, [date, serviceName]);




    useEffect(() => {
        if (date) {
            const slots = availableTimes.map(time => ({
                time,
                status: reservedTimes.includes(time) ? 'booked' : 'available'
            }));
            setTimeSlots(slots);
        }
    }, [date, availableTimes, reservedTimes]);

    const handleTimeClick = (time) => {
        if (!reservedTimes.includes(time)) {
            setSelectedTime(time);
        }
    };

  // Function to convert 12-hour time format to 24-hour format
const convertTo24HourFormat = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
  } else if (modifier === 'AM' && hours === '12') {
      hours = 0;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

const submitHandler = (event) => {
  event.preventDefault();
  
  if (!serviceName || !userName || !email || !date || !selectedTime || !people ) {
    alert("Please fill all fields and select a time.");
    return;
  }
  
  if(people>10){
    alert("Minimum 10 peoples allowed")
  }

  const time24h = convertTo24HourFormat(selectedTime);
  
  const reservationData = {
    serviceName,
    userName,
    people,
    email,
    date,
    time: time24h
  };

  setLoading(true);

  axios
    .post("http://localhost:8081/reservation", reservationData)
    .then((response) => {
      setLoading(false); 
      console.log("Reservation added successfully:", response.data);
      alert("Reservation added successfully");
      
    })
    .catch((error) => {
      setLoading(false); 
      let errorMessage = "An error occurred";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Invalid input. Please check your data.";
            break;
          case 401:
            errorMessage = "Unauthorized. Please log in.";
            break;
          case 404:
            errorMessage = "Resource not found.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = "An unexpected error occurred.";
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your network connection.";
      } else {
        errorMessage = "Error setting up request: " + error.message;
      }

      console.error("Error adding Reservation:", errorMessage);
      alert("Error adding Reservation: " + errorMessage);
    });
};

useEffect(() => {
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:8081/services');
            const services = response.data.map(service => service.serviceName); // Access serviceName property
            console.log('Fetched services:', services);
            setAllServices(services);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    fetchServices();
}, []);
  
const handleChange = (event) => {
    setServiceName(event.target.value);
};

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Reservation Form</h2>
            <form onSubmit={submitHandler} className="space-y-4">
                            <div>
                    <label className="block text-gray-700">Service Name:</label>
                    <div className="relative">
            <select
                value={serviceName}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            >
                <option value="" disabled>Select a service</option>
                {allServices.map((service, index) => (
                    <option key={index} value={service}>
                        {service}
                    </option>
                ))}
            </select>
        </div>
                </div>
                <div>
                    <label className="block text-gray-700">User Name:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">People:</label>
                    <input
                        type="number"
                        value={people}
                        placeholder='Minimum 10'
                        onChange={(e) => setPeople(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Time:</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                    {timeSlots.map(({ time, status }) => (
    <button
        type="button"
        key={time}
        onClick={() => handleTimeClick(time)}
        className={`p-2 rounded-md text-center 
            ${status === 'available' ? 'bg-green-400 hover:bg-green-600 cursor-pointer' : 'bg-red-200 cursor-not-allowed'}
            ${selectedTime === time ? 'bg-yellow-900 text-black' : ''}`}
        disabled={status === 'booked'}
    >
        {time}
    </button>
))}


                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Submit Reservation
                    
                </button>
            </form>
            {loading && (
               <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
               <div className="text-center">
                   <AiOutlineLoading3Quarters className="animate-spin mx-auto text-white" size={50} />
                   <p className="text-white mt-2">Submitting...</p>
               </div>
           </div>
            )}

        </div>
    );
};

export default Reservation;
