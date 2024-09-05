import React from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: '1',
    title: 'Wedding Events',
    description: 'Elegant and luxurious setups tailored to make your wedding unforgettable.',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    id: '2',
    title: 'Corporate Meetings',
    description: 'Professional settings equipped with all the necessary amenities for your meetings.',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    id: '3',
    title: 'Birthday Parties',
    description: 'Fun and vibrant atmospheres for memorable birthday celebrations.',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    id: '4',
    title: 'Private Dinners',
    description: 'Intimate dining experiences with personalized service.',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    id: '5',
    title: 'Holiday Celebrations',
    description: 'Festive and joyful setups for holiday and seasonal celebrations.',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    navigate('/service-detail', { state: { service } });
  };

  return (
    <section id="services" className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={() => handleServiceClick(service)}
            >
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
