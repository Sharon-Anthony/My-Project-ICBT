import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomeServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicesAndImages = async () => {
      try {
        const response = await axios.get("http://localhost:8081/services");
        const servicesData = response.data;

        const updatedServices = await Promise.all(
          servicesData.map(async (service) => {
            try {
              const imageResponse = await axios.get(
                `http://localhost:8081/services/${service.serviceId}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(imageResponse.data);
              return { ...service, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for Service ID:",
                service.serviceId,
                error
              );
              return { ...service, imageUrl: "placeholder-image-url" };
            }
          })
        );

        setServices(updatedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServicesAndImages();
  }, []);

  const handleServiceClick = (service) => {
    navigate(`/services/${service.serviceId}`, { state: { service } });
  };
  
  return (
    <section id="services" className="flex flex-col items-center justify-center p-10 bg-gray-50 ">
      <div className="flex flex-col items-center justify-center p-10 bg-gray-50 mb-10">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-10 ">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.serviceId}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out relative"
              onClick={() => handleServiceClick(service)}
            >
              <div className="relative">
                <img
                  src={service.imageUrl}
                  alt={service.serviceName}
                  className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {service.serviceName}
                </h3>
                <p className="text-gray-700 text-sm md:text-base line-clamp-3">
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

export default HomeServices;
