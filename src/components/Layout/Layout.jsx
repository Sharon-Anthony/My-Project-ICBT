// src/components/Layout.jsx
import React from 'react';
import Navbar from '../AdminComponents/Navbar';
import Sidebar from '../AdminComponents/Sidebar';

const Layout = ({ children }) => {
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

export default Layout;
