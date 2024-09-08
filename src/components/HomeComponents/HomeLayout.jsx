import React from 'react';
import Navigationbar from './Navigationbar';

const HomeLayout = ({ children }) => {
  return (
    <>
      <Navigationbar /> 
      <div className="flex flex-col min-h-screen mt-7">
        <main className="mt-10">
          {children}
        </main>
      </div>
    </>
  );
};

export default HomeLayout;