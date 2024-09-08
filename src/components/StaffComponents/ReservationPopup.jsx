import React from 'react';

const ReservationPopup = ({ reservation, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Reservation Details</h2>
                <p><strong>Reservation ID:</strong> {reservation.reservationId}</p>
                <p><strong>Service Name:</strong> {reservation.serviceName}</p>
                <p><strong>Username:</strong> {reservation.userName}</p>
                <p><strong>People:</strong> {reservation.people}</p>
                <p><strong>Email:</strong> {reservation.email}</p>
                <p><strong>Date:</strong> {reservation.date}</p>
                <p><strong>Time:</strong> {reservation.time}</p>
                <p><strong>Confirmation:</strong> {reservation.confirmation || 'Not Confirmed'}</p>
                <p><strong>Confirmed By:</strong> {reservation.confirmedBy || 'N/A'}</p>
                
                <button
                    className="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-900"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ReservationPopup;
