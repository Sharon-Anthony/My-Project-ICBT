import React from 'react';
import { useLocation } from 'react-router-dom';

const ServiceDetail = () => {
    const location = useLocation();
    const { service } = location.state || {};

    if (!service) return <div>Service not found</div>;

    return (
        <div className="bg-white w-full">
            {/* Hero Section */}
            <div
                className="relative w-[1365px] h-[400px] bg-cover bg-center"
                style={{ backgroundImage: `url(${service.imageUrl})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white">{service.title}</h1>
                </div>
            </div>

            {/* Service Content */}
            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 2rem' }}>
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-semibold text-gray-800 mb-4">About This Service</h2>
                    <p className="text-lg text-gray-600">{service.description}</p>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {service.features && service.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-6 w-6 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414L9 14.414 5.293 10.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-800">{feature.title}</h3>
                                <p className="mt-2 text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
                        Reserve Row
                    </button>
                    <button className="ml-4 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
                        Make Query
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
