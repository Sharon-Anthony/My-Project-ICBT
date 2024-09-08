import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            console.log("No user found, redirecting to login...");
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>; 
    }

    const handleEditClick = (user) => {
        navigate('/update-profile', { state: { user } });
    };

     const handleDeleteClick = () => {
        axios.post('http://localhost:8081/logout', {}, { withCredentials: true })
            .then(() => {
                onLogout(); 
                navigate('/'); 
            })
            .catch((error) => {
                console.error("Error logging out:", error.response || error.message || error);
                alert("Logout failed. Please try again.");
            });

        const userId = user?.userId;
    
        if (!userId) {
            alert("User ID not found!");
            return;
        }
    
        axios.delete(`http://localhost:8081/user/${userId}`)
            .then(() => {
                localStorage.removeItem("user");
                setUser(null);
                alert("User deleted successfully!");
                navigate('/');  
            })
            .catch((error) => {
                console.error("There was an error deleting the user:", error);
                alert("Failed to delete user. Please try again.");
            });
        
    };

    const onLogout = () => {
        console.log("User logged out");
        localStorage.removeItem("user"); 
    };
    
    const getCurrentDate = () => {
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 w-[1000px]">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Welcome, {user.username}</h1>
                        <p className="text-sm text-gray-500">{getCurrentDate()}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => handleEditClick(user)}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={handleDeleteClick}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 focus:outline-none"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="flex items-center mb-6">
                    <img
                        className="w-24 h-24 rounded-full border-2 border-gray-200"
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                    />
                    <div className="ml-4">
                        <h2 className="text-lg font-semibold text-gray-700">{user.username}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-600 font-medium">User Name</label>
                        <input
                            type="text"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-50"
                            value={user.username}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-50"
                            value={user.email}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Address</label>
                        <input
                            type="text"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-50"
                            value={user.address}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Phone Number</label>
                        <input
                            type="text"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-50"
                            value={user.phoneNumber}
                            readOnly
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">My Email Address</h3>
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            className="form-radio text-blue-600"
                            checked
                            readOnly
                        />
                        <label className="ml-2 text-gray-700">{user.email}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
