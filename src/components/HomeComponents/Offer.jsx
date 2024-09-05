import React from 'react';
import gallery6 from '../../assets/offer-image.jpeg'

const PromoBanner = () => {
  return (
    <div className="relative w-full h-[400px] bg-cover bg-center"   style={{ backgroundImage: `url(${gallery6})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start p-10 md:p-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          ABC <span className="text-yellow-400">Restaurant</span>
        </h1>
        <p className="text-2xl md:text-3xl font-medium text-white mb-8">
          35% Off on All Orders. Grab it Fast!
        </p>
        <button className="px-6 py-3 bg-yellow-400 text-black font-bold text-lg rounded-md hover:bg-yellow-500 transition duration-300">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
