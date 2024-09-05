import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
    const [user, setUser] = useState(null);

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


    return (
        <div className="min-h-screen bg-gray-100 p-6 w-[1000px]">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Welcome, {user.username}</h1>
                        <p className="text-sm text-gray-500">Tue, 07 June 2022</p>
                    </div>
                    <div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none">
                            Edit
                        </button>
                    </div>
                </div>

                {/* Profile Section */}
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

                {/* Form Section */}
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
//hey i'm not using usercontext