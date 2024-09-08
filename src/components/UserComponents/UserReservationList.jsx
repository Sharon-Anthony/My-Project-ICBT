import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
// import StaffPopup from './StaffPopup'; // Ensure this is imported correctly

function UserReservationList() {
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const reservationPerPage = 5;

    const [user, setUser] = useState(null);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            console.log("No user found, redirecting to login...");
        }
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8081/reservation")
            .then((response) => {
                if (response.status === 200 && response.data) {
                    setReservations(response.data);
                }
            })
            .catch((error) => {
                console.log("No reservations:", error);
            });
    }, []);

    const handleDeleteClick = (reservationId) => {
        if (window.confirm("Are you sure you want to delete this reservation?")) {
            axios.delete(`http://localhost:8081/reservation/${reservationId}`)
                .then(() => {
                    alert("Reservation deleted successfully!");
                    setReservations(reservations.filter(reservation => reservation.reservationId !== reservationId));
                })
                .catch((error) => {
                    console.error("There was an error deleting the reservation:", error);
                    alert("Failed to delete reservation. Please try again.");
                });
        }
    };
    

    useEffect(() => {
        if (user) {
            const filtered = reservations.filter(reservation =>
                reservation.email === user.email &&
                (reservation.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 reservation.userName.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredReservations(filtered);
        }
    }, [reservations, user, searchTerm]);

    const indexOfLastReservation = currentPage * reservationPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationPerPage;
    const currentReservations = filteredReservations.slice(indexOfFirstReservation, indexOfLastReservation);

    const totalPages = Math.ceil(filteredReservations.length / reservationPerPage);
    const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);


    const handleEditClick = (reservation) => {
        navigate('/update-user-reservation-list', { state: { reservation: reservation } });
    };

    const handleVisibilityClick = (reservation) => {
        setSelectedReservation(reservation);
    };

    const handleClosePopup = () => {
        setSelectedReservation(null);
    };

    // Helper function to format LocalDate and LocalTime
    const formatDate = (date) => date ? new Date(date).toLocaleDateString() : '';
    const formatTime = (time) => time ? new Date(`1970-01-01T${time}`).toLocaleTimeString() : '';

    return (
        <div className='h-screen pt-10 relative w-[1000px]'>
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Reservations</h1>

            <div className="flex items-center space-x-2 justify-end mt-10">
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

            <div className="mt-3 relative overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-gray-400 table-fixed">
                    <thead className="bg-gray-700 text-gray-500 uppercase text-xs font-medium">
                        <tr>
                            <th className="p-3 text-left w-28 break-words">Reservation ID</th>
                            <th className="p-3 text-left w-36 break-words">Service Name</th>
                            <th className="p-3 text-left w-36 break-words">Username</th>
                            <th className="p-3 text-left w-24 break-words">People</th>
                            <th className="p-3 text-left w-40 break-words">Email</th>
                            <th className="p-3 text-left w-28 break-words">Date</th>
                            <th className="p-3 text-left w-28 break-words">Time</th>
                            <th className="p-3 text-left w-32 break-words">Confirmation</th>
                            <th className="p-3 text-left w-36 break-words">Confirmed By</th>
                            <th className="p-3 text-left w-28 break-words">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {currentReservations.map((reservation, index) => (
                            <tr key={index} className="hover:bg-gray-700">
                                <td className="p-3 font-bold break-words">{reservation.reservationId}</td>
                                <td className="p-3 break-words">{reservation.serviceName}</td>
                                <td className="p-3 break-words">{reservation.userName}</td>
                                <td className="p-3 break-words">{reservation.people}</td>
                                <td className="p-3 break-words">{reservation.email}</td>
                                <td className="p-3 break-words">{formatDate(reservation.date)}</td>
                                <td className="p-3 break-words">{formatTime(reservation.time)}</td>
                                <td className="p-3 break-words">{reservation.confirmation ? 'Confirmed' : 'Not Confirmed'}</td>
                                <td className="p-3 break-words">{reservation.confirmedBy}</td>
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
                                    
                                    <a href="#" 
                                    onClick={() => handleDeleteClick(reservation.reservationId)}
                                    className="text-gray-400 hover:text-gray-100 inline-flex items-center ml-2">
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
                        disabled={indexOfLastReservation >= filteredReservations.length}
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

export default UserReservationList;
