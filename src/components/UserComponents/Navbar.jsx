import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Navbar() {
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

    const handleLogoutButtonClick = () => {
        axios.post('http://localhost:8081/logout', {}, { withCredentials: true })
            .then(() => {
                onLogout(); 
                navigate('/'); 
            })
            .catch((error) => {
                console.error("Error logging out:", error.response || error.message || error);
                alert("Logout failed. Please try again.");
            });
    };

    const onLogout = () => {
        console.log("User logged out");
        localStorage.removeItem("user"); 
    };

    return (
        <div className="fixed w-full flex items-center justify-between h-14 bg-teal-500 text-white z-10 px-4">
            <div className="flex items-center space-x-2 h-full">
                <span className="hidden md:block text-lg font-semibold">USER DASHBOARD</span>
            </div>

            <div className="flex items-center space-x-4">
                <a href="/" className="flex items-center text-yellow-300 hover:text-blue-100">
                    Home
                </a>

                <div className="w-px h-6 bg-gray-400 dark:bg-gray-700"></div>

                <a href="#" className="flex items-center text-yellow-300 hover:text-blue-100" 
                    onClick={handleLogoutButtonClick}
                >
                    Logout
                </a>
            </div>
        </div>
    );
}

export default Navbar;
