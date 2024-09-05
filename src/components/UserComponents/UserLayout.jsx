import React from 'react';
import Navbar from '../UserComponents/Navbar';
import Sidebar from '../UserComponents//Sidebar';

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-10 mt-10">
          {children}
        </main>
      </div>
    </>
  );
};

export default UserLayout;
