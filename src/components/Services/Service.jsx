import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Query from "./Query";

const Service = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/services/${serviceId}`
        );
        setService(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching service", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/services/${serviceId}/image`,
          { responseType: "blob" }
        );
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Error fetching service image", error);
        setImageUrl("placeholder-image-url"); // Placeholder in case of error
      }
    };

    fetchService();
  }, [serviceId]);

  if (!service) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
      </div>
    );
  }

  const handleReserveNowClick = () => {
    navigate('/reservation', { state: { serviceName: service.serviceName } });
  };

  // Function to open the popup
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-white">
      <div
        className="relative w-[1350px] h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl || 'placeholder-image-url'})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">{service.serviceName}</h1>
        </div>
      </div>

      {/* Service Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
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
                <h3 className="text-lg font-medium text-gray-800">{feature.serviceName}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button
            onClick={handleReserveNowClick}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          >
            Reserve Now
          </button>
          <button
            onClick={handleOpenPopup}
            className="ml-4 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Make Query
          </button>

          {showPopup && (
            <Query handleClose={handleClosePopup} serviceName={service.serviceName} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Service;
