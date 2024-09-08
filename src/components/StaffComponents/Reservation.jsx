import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import ReservationPopup from './ReservationPopup';
import { RxCounterClockwiseClock } from 'react-icons/rx';

function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const reservationPerPage = 5;
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

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
        
        const confirmMatch = typeof reservation.confirmation === 'string' && reservation.confirmation.toLowerCase().includes(lowerSearchTerm);
      
        return userIdMatch || servicenameMatch || usernameMatch || emailMatch || peopleMatch || dateMatch || timeMatch || confirmMatch;
    });

    const totalPages = Math.ceil(filteredReservations.length / reservationPerPage);
    const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

    const indexOfLastReservation = currentPage * reservationPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationPerPage;
    const currentReservations = filteredReservations.slice(indexOfFirstReservation, indexOfLastReservation);

    const navigate = useNavigate();

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            console.log("No user found, redirecting to login...");
        }
    }, [navigate]);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:8081/reservation")
            .then((response) => {
                if (response.status === 200 && response.data) {
                    setReservations(response.data);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log("No reservations:", error);
                setLoading(false);
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

    const handleEditClick = (reservation) => {
        navigate('/update-staff-reservation-list', { state: { reservation: reservation } });
    };

    const handleVisibilityClick = (reservation) => {
        setSelectedReservation(reservation);
    };

    const handleClosePopup = () => {
        setSelectedReservation(null);
    };

    const formatDate = (date) => date ? new Date(date).toLocaleDateString() : '';
    const formatTime = (time) => time ? new Date(`1970-01-01T${time}`).toLocaleTimeString() : '';

    return (
        <div className='p-6 bg-gray-100 min-h-screen space-y-6 shadow-md rounded-lg p-4 mt-6 relative w-[1000px]'>
       
            <div className="flex items-center space-x-3 mb-6">
                <RxCounterClockwiseClock className="h-8 w-8 text-gray-800" />
                <h1 className="text-3xl font-bold text-gray-800">Reservations List</h1>
            </div>

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
            {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-900"></div>
        </div>
      ) : 

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
                                <td className="p-3 break-words">{reservation.confirmation || "Not Confirmed"}</td>
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
                        {filteredReservations.length === 0 && (
                            <tr>
                                <td colSpan="10" className="p-4 text-center text-gray-300">
                                    No reservations found.
                                </td>
                            </tr>
                        )}
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
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Next
                    </button>
                </div>
            </div>
           } {selectedReservation && (
                <ReservationPopup reservation={selectedReservation} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default Reservation;
//what the fuck u mother   fucker doing i talked about popup its not working do that u asshole