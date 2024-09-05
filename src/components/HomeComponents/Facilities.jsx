import React from 'react';
import dineIn from '../../assets/dine-in.jpg'
import delivery from '../../assets/delivery.webp'

const Facilities = () => {
  return (
    <div id='facilities' className=" flex flex-col items-center justify-center p-10 bg-gray-50">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-10">Our Facilities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Dine-In Section */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={dineIn} 
            alt="Dine-In"
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Dine-In</h2>
            <p className="text-gray-600">
              Enjoy a delightful dining experience with our cozy and elegant restaurant ambiance. Perfect for family dinners, business lunches, or a romantic evening out.
            </p>
          </div>
        </div>

        {/* Delivery Section */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={delivery}
            alt="Delivery"
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Delivery</h2>
            <p className="text-gray-600">
              Get your favorite meals delivered straight to your door. Fast, reliable, and convenient service ensures that you can enjoy our delicious food wherever you are.
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Facilities;
