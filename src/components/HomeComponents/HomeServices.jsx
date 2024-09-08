import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomeServices = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching services:", error);
        setIsLoading(false); 
      }
    };

    fetchServicesAndImages();
  }, []);

  const handleServiceClick = (service) => {
    navigate(`/services/${service.serviceId}`, { state: { service } });
  };

  return (
    <section id="services" className="flex flex-col items-center justify-center p-10 bg-gray-100 w-[1351px]">
      <div className="container mx-auto ">
        <h2 className="text-5xl font-extrabold text-gray-800 text-center mb-16">
          Our Services
        </h2>

    
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-60">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500 border-solid"></div>
            <p className="mt-4 text-gray-700 font-semibold text-3xl">Loading Services...</p>
          </div>
        ) : (
          <Slider {...settings}>
            {services.map((service) => (
              <div key={service.serviceId} className="px-4">
                <div
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                
                  <div className="relative">
                    <img
                      src={service.imageUrl}
                      alt={service.serviceName}
                      className="w-full h-60 object-cover transition-transform duration-300 transform hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
                  </div>

                  <div className="p-6 h-[185px]">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                      {service.serviceName}
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <p className="text-xl font-bold text-yellow-600">
                      ${service.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default HomeServices;


