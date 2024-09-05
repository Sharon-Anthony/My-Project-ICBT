import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const userToEdit = location.state?.user || {};

    const [formData, setFormData] = useState({
        username: userToEdit.username || '',
        email: userToEdit.email || '',
        password: '',
        confirmPassword: '',
        address: userToEdit.address || '',
        phoneNumber: userToEdit.phoneNumber || '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setFormData(storedUser); 
        } else {
            console.log("No user found, redirecting to login...");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }


        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const userId = userToEdit.userId;

        axios.put(`http://localhost:8081/user/${userId}`, formData)
            .then(response => {
                console.log('User updated successfully:', response.data);
                localStorage.setItem("user", JSON.stringify(formData));  // Update localStorage
                alert("User updated successfully!");
                navigate('/user-dashboard');  // Navigate to the profile or another page after update
            })
            .catch(error => {
                console.error('There was an error updating the user:', error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 w-[1000px]">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Update User</h1>

                {/* Update Form */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-600 font-medium">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-50"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-50"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-50"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-50"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-50"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-50"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
