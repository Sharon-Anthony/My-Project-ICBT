import React from 'react';
import gallery1 from '../../assets/gallery1.jpg'
import gallery2 from '../../assets/gallery2.jpg'
import gallery3 from '../../assets/gallery3.jpg'
import gallery4 from '../../assets/gallery4.jpg'
import gallery5 from '../../assets/gallery5.jpg'
import gallery6 from '../../assets/gallery6.jpg'

const images = [
  {  alt: 'Event 1' },
  {  alt: 'Event 2' },
  {  alt: 'Event 3' },
  {  alt: 'Event 4' },
  {  alt: 'Event 5' },
  {  alt: 'Event 6' },
];

const HomeGallery = () => {
  return (
    <div id="gallery" className="bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center mb-6">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
          Experience Our Ambiance
        </h2>
        <p className="text-lg text-gray-600">
          A glimpse into our carefully curated spaces designed to host your most memorable events.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6 sm:col-span-4 h-48 sm:h-64">
          <img
            src={gallery1}
            alt={images[0].alt}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="col-span-6 sm:col-span-8 h-48 sm:h-64">
          <img
            src={gallery2}
            alt={images[1].alt}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 h-48 sm:h-64">
          <img
            src={gallery3}
            alt={images[2].alt}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="col-span-6 sm:col-span-6 h-48 sm:h-64">
          <img
            src={gallery4}
            alt={images[3].alt}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="col-span-6 sm:col-span-8 h-48 sm:h-64">
          <img
            src={gallery5}
            alt={images[4].alt}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="col-span-6 sm:col-span-4 h-48 sm:h-64">
          <img
            src={gallery6}
            alt={images[5].alt}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeGallery;
//this is my final Homegallery componenet now what u have to do is if i hover the mouse on this entire component a arrow pointing right side should apper like saying Explore more and once i clicked the arrow i should be able to navigate the gallery component