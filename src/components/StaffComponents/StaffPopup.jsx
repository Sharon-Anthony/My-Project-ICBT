import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

const StaffPopup = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <IoCloseCircleOutline
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 cursor-pointer hover:text-gray-800"
                    size={24}
                />
                <h2 className="text-xl font-bold mb-4">User Details</h2>
                <p><strong>User ID:</strong> {user.userId}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Password:</strong> {user.password}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                </div>
        </div>
    );
};

export default StaffPopup;
