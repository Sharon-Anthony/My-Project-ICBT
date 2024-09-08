import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserShield } from 'react-icons/fa';
import { CgLock } from 'react-icons/cg';
import { CiClock1 } from 'react-icons/ci';
import { GrDocumentStore } from 'react-icons/gr';
import { BiLogOut, BiMoney } from 'react-icons/bi';


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
    <div className="font-poppins antialiased h-full w-60 flex flex-row mt-10">
    <div
      id="sidebar"
      className="fixed bg-white h-screen md:block shadow-xl px-3 w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
    >

 <div className="space-y-6 md:space-y-10 mt-10">

 <div id="profile" className="mt-16 space-y-4 text-center">
  <img
      src="https://via.placeholder.com/150" 
      alt="Avatar user"
      className="w-14 md:w-20 h-14 md:h-20 rounded-full mx-auto object-cover border-2 hover:bg-gray-900"
  />
  <div>
      <h2 className="text-lg md:text-xl font-semibold">
          Staff
      </h2>
  </div>
</div>
         
          <div id="menu" className="flex flex-col space-y-2">
            <Link
              to="/staff-dashboard"
              className="flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gray-900 hover:text-white rounded-md transition duration-150 ease-in-out"
            >
               <FaUserShield size={20} className="mr-2" />
              <span>Staff Dashboard</span>
            </Link>
            <Link
              to="/reservation-list"
              className="flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gray-900 hover:text-white rounded-md transition duration-150 ease-in-out"
            > <CiClock1 size={20} className="mr-2" />
              <span>Reservation Management</span>
            </Link>
            <Link
              to="/query-list"
              className="flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gray-900 hover:text-white rounded-md transition duration-150 ease-in-out"
            > <GrDocumentStore size={20} className="mr-2" />
              <span>Query Management</span>
            </Link>
            <Link
              to="/reservation-list"
              className="flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gray-900 hover:text-white rounded-md transition duration-150 ease-in-out"
            > <BiMoney size={20} className="mr-2" />
              <span>Payment Management</span>
            </Link>
            <a
              href="#"
              onClick={handleLogoutButtonClick} 
              className="flex items-center text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gray-900 hover:text-white rounded-md transition duration-150 ease-in-out"
            > <BiLogOut size={20} className="mr-2" />
              <span>Log Out</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
//