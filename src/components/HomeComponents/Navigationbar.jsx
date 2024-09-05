import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiRestaurant } from 'react-icons/bi';
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";
import Login from "./Login";
import axios from "axios";

const Navigationbar = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({ userId:"",email: "", username: "" });
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setLoggedIn(true);
        }
    }, []);

    console.log("useridis:-"+user.userId);
    
    const handleLogoutButtonClick = () => {
        axios.post('http://localhost:8081/logout', {}, { withCredentials: true })
            .then(() => {
                onLogout(); // Trigger any additional logout actions
                navigate('/'); // Use react-router-dom's navigate
            })
            .catch((error) => {
                console.error("Error logging out:", error);
                alert("Logout failed. Please try again.");
            });
    };

    const onLogout = () => {
        console.log("User logged out");
        localStorage.removeItem("user"); // Clear user info from localStorage
        setLoggedIn(false);
    };

    const handleLoginButtonClick = () => {
        setShowPopup(true);
    };

    const handleLogin = (user) => {
        console.log(user); 
        localStorage.setItem("user", JSON.stringify(user)); // Store user info in localStorage
        setUser(user); 
        setLoggedIn(true);
        setShowPopup(false);
        navigate('/'); 
    };

    const closePopup = () => {
        setShowPopup(false);
        navigate('/'); 
    };

    const handleChange = () => {
        setMenu(!menu);
    };

    const handleProfileClick = () => {
        const firstLetter = user.userId.charAt(0).toLowerCase();
    
        if (firstLetter === 'u') {
            navigate('/user-dashboard');
        } else if (firstLetter === 'a') {
            navigate('/admin-dashboard');
        } else if (firstLetter === 's') {
            navigate('/staff-dashboard');
        } else {
            alert("Invalid user ID format");
        }
    };

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 60; 
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition - offset;
    
            window.scrollTo({
                top: window.pageYOffset + offsetPosition,
                behavior: "smooth"
            });
            setMenu(false); // Close the menu after navigation in mobile view
        }
    };

    return (
        <div className="fixed w-full z-50 top-0 left-0">
            <div>
                <div className="flex justify-between p-5 px-10 bg-gray-900 shadow-md">
                    <div className="flex items-center cursor-pointer text-yellow-500">
                        <span>
                            <BiRestaurant size={32} />
                        </span>
                        <h1 className="text-2xl font-bold ml-2">ABC Restaurant</h1>
                    </div>
                    <nav className="hidden md:flex items-center text-lg font-medium gap-8 text-white">
                        <a onClick={() => handleScroll("home")} className="hover:text-yellow-500 transition-all cursor-pointer">Home</a>
                        <a onClick={() => handleScroll("services")} className="hover:text-yellow-500 transition-all cursor-pointer">Services</a>
                        <a onClick={() => handleScroll("facilities")} className="hover:text-yellow-500 transition-all cursor-pointer">Facilities</a>
                        <a onClick={() => handleScroll("about")} className="hover:text-yellow-500 transition-all cursor-pointer">About</a>
                        <a onClick={() => handleScroll("gallery")} className="hover:text-yellow-500 transition-all cursor-pointer">Gallery</a>
                        <a onClick={() => handleScroll("contactUs")} className="hover:text-yellow-500 transition-all cursor-pointer">Contact Us</a>
                        <div>
                             {/*  */}
                        {loggedIn ? (
          <div className="group inline-block">
          <label
            className="text-yellow-500 cursor-pointer"
          >
            Hi! {user.username}
          </label>

          {/* Dropdown Menu */}
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block transition ease-in-out duration-150">
            <div className="py-1">
              <a
                href="#profile"
                onClick={handleProfileClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                My profile
              </a>
              <a
                href="#reservations"
               // onClick={handleReservationsClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                My reservations
              </a>
              <a
                href="#logout"
                onClick={handleLogoutButtonClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Log out
              </a>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="px-6 py-1 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition-all rounded-full"
          onClick={handleLoginButtonClick}
        >
          Login
        </button>
      )}
                            {showPopup && <Login setShowPopup={setShowPopup} onLogin={handleLogin} />}
                        </div>
                    </nav>
                    <div className="md:hidden flex items-center text-yellow-500">
                        {menu ? (
                            <AiOutlineClose size={25} onClick={handleChange} />
                        ) : (
                            <AiOutlineMenuUnfold size={25} onClick={handleChange} />
                        )}
                    </div>
                </div>
                <div className={`lg:hidden flex flex-col absolute bg-gray-900 text-white left-0 top-20 font-semibold text-xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"}`}>
                    <a onClick={() => handleScroll("home")} className="hover:text-yellow-500 transition-all cursor-pointer">Home</a>
                    <a onClick={() => handleScroll("services")} className="hover:text-yellow-500 transition-all cursor-pointer">Services</a>
                    <a onClick={() => handleScroll("about")} className="hover:text-yellow-500 transition-all cursor-pointer">About</a>
                    <a onClick={() => handleScroll("gallery")} className="hover:text-yellow-500 transition-all cursor-pointer">Gallery</a>
                    <a onClick={() => handleScroll("contactUs")} className="hover:text-yellow-500 transition-all cursor-pointer">Contact Us</a>
                    {loggedIn ? (
                        <>
                            <label
                                className="text-yellow-500"
                                onClick={handleProfileClick}
                            >
                                Hi! {user.username} 
                            </label>
                        </>
                    ) : (
                        <button
                            className="px-6 py-1 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition-all rounded-full"
                            onClick={handleLoginButtonClick}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navigationbar;