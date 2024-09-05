import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from '@material-tailwind/react';

function UpdateUser() {
    const location = useLocation();
    const navigate = useNavigate();

    const userToEdit = location.state?.user || {};

    const [formData, setFormData] = useState({
        username: userToEdit.username || '',
        email: userToEdit.email || '',
        password: userToEdit.password || '',
        address: userToEdit.address || '',
        phoneNumber: userToEdit.phoneNumber || '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Assuming userId is part of formData or is available in scope
        const userId = userToEdit.userId;
    
        axios.put(`http://localhost:8081/user/${userId}`, formData)
            .then(response => {
                // Handle successful response
                console.log('User updated successfully:', response.data);
                alert("User updated successfully")
            })
            .catch(error => {
                // Handle error response
                console.error('There was an error updating the user:', error);
            });
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative w-[1000px]">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg ">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">User Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;