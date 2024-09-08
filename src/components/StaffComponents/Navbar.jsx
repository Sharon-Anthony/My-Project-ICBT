import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/16/solid';
import { AiOutlineLogout } from 'react-icons/ai';

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
    <div className="fixed w-full flex items-center justify-between h-14 bg-gray-900 text-white z-10 px-4">
      <div className="flex items-center cursor-pointer text-yellow-500">
                <span className="hidden md:block text-lg font-semibold">STAFF PANEL</span>
      </div>


      <div className="flex items-center space-x-4">
      <a href="/" className="flex items-center cursor-pointer text-yellow-500">
    <HomeIcon className="w-6 h-6" />
    <span className="text-lg font-semibold">Home</span>
</a>

       
        <div className="flex items-center cursor-pointer text-yellow-500"></div>

        <a href="#" 
          onClick={handleLogoutButtonClick}
        className="flex items-center text-gray-300 hover:text-blue-100">
           <AiOutlineLogout className="w-6 h-6" />
           Logout
        </a>
      </div>
      
    </div>
  );
}

export default Navbar;
