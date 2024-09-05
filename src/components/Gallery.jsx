import React from 'react';

function Gallery() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h1>
          <p className="text-lg text-gray-600 mb-12">
            Explore our collection of stunning visuals and creative designs that showcase our work.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center"
                  src={`https://dummyimage.com/${600 + index * 5}x${360 + index * 3}`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-lg font-bold mb-2">Gallery Item {index + 1}</h2>
                  <p className="text-sm text-center px-4">A brief description of this gallery item. Add more details as needed.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;

