import React from 'react';

function Navbar() {
  return (
    <div className="fixed w-full flex items-center justify-between h-14 bg-teal-500 text-white z-10 px-4">
      {/* Left Section */}
      <div className="flex items-center space-x-2 h-full">
                <span className="hidden md:block text-lg font-semibold">ADMIN PANEL</span>
      </div>


      {/* Right Section */}
      <div className="flex items-center space-x-4">
      <a href="#" className="flex items-center text-gray-300 hover:text-blue-100">
          My Profile
        </a>
       
        <div className="w-px h-6 bg-gray-400 dark:bg-gray-700"></div>

        <a href="#" className="flex items-center text-gray-300 hover:text-blue-100">
          Logout
        </a>
      </div>
      
    </div>
  );
}

export default Navbar;
