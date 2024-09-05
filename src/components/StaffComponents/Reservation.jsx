import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import StaffPopup from './StaffPopup';

function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const reservationPerPage = 5;

    const indexOfLastReservation = currentPage * reservationPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationPerPage;
    const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);
    
    const totalPages = Math.ceil(reservations.length / reservationPerPage);
    const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredReservations = reservations.filter(reservation => {
        const lowerSearchTerm = searchTerm.toLowerCase();

        const userIdMatch = typeof reservation.reservationId === 'string' && reservation.reservationId.toLowerCase().includes(lowerSearchTerm);
        const servicenameMatch = typeof reservation.serviceName === 'string' && reservation.serviceName.toLowerCase().includes(lowerSearchTerm);
        const usernameMatch = typeof reservation.userName === 'string' && reservation.userName.toLowerCase().includes(lowerSearchTerm);
        const peopleMatch = typeof reservation.people === 'number' && reservation.people.toString().includes(lowerSearchTerm);
        const emailMatch = typeof reservation.email === 'string' && reservation.email.toLowerCase().includes(lowerSearchTerm);
        const dateMatch = typeof reservation.date === 'string' && reservation.date.toLowerCase().includes(lowerSearchTerm);
        const timeMatch = typeof reservation.time === 'string' && reservation.time.toLowerCase().includes(lowerSearchTerm);
        const confirmMatch = typeof reservation.confirmation === 'boolean' && (reservation.confirmation ? 'confirmed' : 'not confirmed').includes(lowerSearchTerm);
      
        return userIdMatch || servicenameMatch || usernameMatch || emailMatch || peopleMatch || emailMatch || dateMatch || timeMatch || confirmMatch;
    });

    const navigate = useNavigate();

    const handleEditClick = (reservation) => {
        navigate('/updateuser', { state: { reservation: reservation } });
    };

    useEffect(() => {
        axios.get("http://localhost:8081/reservation")
            .then((response) => {
                if (response.status === 200 && response.data) {
                    setReservations(response.data); // Update state with fetched data
                }
            })
            .catch((error) => {
                console.log("No reservations:", error);
            });
    }, []);

    const handleVisibilityClick = (reservation) => {
        setSelectedReservation(reservation);
    };

    const handleClosePopup = () => {
        setSelectedReservation(null);
    };

    // Helper function to format LocalDate and LocalTime
    const formatDate = (date) => date ? new Date(date).toLocaleDateString() : '';
    const formatTime = (time) => time ? new Date(time).toLocaleTimeString() : '';

    return (
        <div className='h-screen pt-10 relative w-[1000px]'>
            <div className="flex items-center space-x-2 justify-end mt-10 ">
                <div className="relative flex">
                    <input
                        type="text"
                        className="w-full max-w-xs rounded-md px-2 py-2 text-sm text-gray-600 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 pl-10"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 px-2 py-2 rounded-md flex items-center justify-center"
                    >
                        <BiSearch />
                    </button>
                </div>
            </div>

            <div className="overflow-auto mt-3">
                <table className="min-w-full bg-gray-800 text-gray-400">
                    <thead className="bg-gray-700 text-gray-500 uppercase text-xs font-medium">
                        <tr>
                            <th className="p-3 text-left">Reservation ID</th>
                            <th className="p-3 text-left">Service Name</th>
                            <th className="p-3 text-left">Username</th>
                            <th className="p-3 text-left">People</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Time</th>
                            <th className="p-3 text-left">Confirmation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredReservations.map((reservation, index) => (
                            <tr key={index} className="hover:bg-gray-700">
                                <td className="p-3 font-bold">{reservation.reservationId}</td>
                                <td className="p-3">{reservation.serviceName}</td>
                                <td className="p-3">{reservation.userName}</td>
                                <td className="p-3">{reservation.people}</td>
                                <td className="p-3">{reservation.email}</td>
                                <td className="p-3">{formatDate(reservation.date)}</td>
                                <td className="p-3">{formatTime(reservation.time)}</td>
                                <td className="p-3">{reservation.confirmation ? 'Confirmed' : 'Not Confirmed'}</td>
                                <td className="p-3 flex space-x-2">
                                    <a href="#" onClick={() => handleVisibilityClick(reservation)} className="text-gray-400 hover:text-gray-100 inline-flex items-center">
                                        <span className="material-icons-outlined text-[25px] leading-none">visibility</span>
                                    </a>
                                    <button
                                        className="text-gray-400 hover:text-gray-100 inline-flex items-center ml-2 p-0 bg-transparent border-none"
                                        onClick={() => handleEditClick(reservation)}
                                    >
                                        <span className="material-icons-outlined text-[25px] leading-none">edit</span>
                                    </button>
                                    <a href="#" className="text-gray-400 hover:text-gray-100 inline-flex items-center ml-2">
                                        <span className="material-icons-round text-[25px] leading-none">delete_outline</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center space-x-2 mt-4">
                    <button
                        className="px-3 py-1 bg-gray-700 text-gray-400 rounded hover:bg-gray-600"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            className={`px-3 py-1 ${currentPage === number ? 'bg-gray-600 text-gray-100' : 'bg-gray-700 text-gray-400'} rounded hover:bg-gray-600`}
                            onClick={() => setCurrentPage(number)}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        className="px-3 py-1 bg-gray-700 text-gray-400 rounded hover:bg-gray-600"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={indexOfLastReservation >= reservations.length}
                    >
                        Next
                    </button>
                </div>
            </div>
            {selectedReservation && (
                <StaffPopup reservation={selectedReservation} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default Reservation;
