import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Sidebar() {
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
    <div className="font-poppins antialiased h-full w-60 flex flex-row">
      <div
        id="sidebar"
        className="fixed bg-white h-screen md:block shadow-xl px-3 w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
      >

        <div className="space-y-6 md:space-y-10 mt-10">

          <div id="profile" className="space-y-3 mt-16"  >
            <img
              src="" 
              alt="Avatar user"
              className="w-10 md:w-16 rounded-full mx-auto"
            />
            <div>
              <h2 className="font-medium text-xs md:text-sm text-center text-teal-500 ">
             User
              </h2>
            </div>
          </div>
          <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500">
            <input
              type="text"
              className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
              placeholder="Search"
            />
            <button className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block">
              <svg
                className="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div id="menu" className="flex flex-col space-y-2">
            <Link
              to="/user-dashboard"
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
            >
              <span>My Profile</span>
            </Link>
            <Link
              to="/user-reservation-list"
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <span>My Reservations</span>
            </Link>
        
            <Link
              to="/user-payment-list"
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <span>My Payments</span>
            </Link>
            <a
              href="#" 
              onClick={handleLogoutButtonClick} 
              className="text-sm font-medium text-gray-700 py-5 px-10 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <span>Log Out</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;