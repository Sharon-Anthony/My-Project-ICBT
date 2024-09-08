import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Query from "./MakeQueryPopup";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/services/${serviceId}`
        );
        setService(response.data);
        if (response.data.imageName) {
          fetchImage();
          setIsLoading(false); 
        }
      } catch (error) {
        console.error("Error fetching service", error);
        setIsLoading(false); 
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/services/${serviceId}/image`,
          { responseType: "blob" }
        );
        setImageUrl(URL.createObjectURL(response.data));
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching service image", error);
        setImageUrl("placeholder-image-url");
        setIsLoading(false); 
      }
    };

    fetchService();
  }, [serviceId]);

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  const handleReserveNowClick = () => {
    if (isLoggedIn) {
      navigate('/make-reservation', { state: { serviceName: service.serviceName } });
    } else {
      setShowSignUpModal(true);
    }
  };

  const handleOpenPopup = () => {
    if (isLoggedIn) {
      setShowPopup(true);
    } else {
      setShowSignUpModal(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen w-[1351px]">
        <div className="flex flex-col items-center justify-center ">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500 border-solid"></div>
          <p className="mt-4 text-gray-700 font-semibold text-3xl">Loading Services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 relative w-[1351px]" >
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl || 'placeholder-image-url'})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-white tracking-wide">{service.serviceName}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 bg-white shadow-md rounded-lg mt-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About This Service</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
        </div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Instructions</h4>
            <p className="text-md text-gray-600">
              {service.instructions || "No instructions provided."}
            </p>
          </div>
          <div className="text-right">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Price</h4>
            <p className="text-3xl font-bold text-green-600">${service.price || "Price not available."}</p>
          </div>
        </div>
          <div className="mt-16 text-center">
          <button
            onClick={handleReserveNowClick}
            className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out"
          >
            Reserve Now
          </button>
          <button
            onClick={handleOpenPopup}
            className="ml-4 bg-gray-100 text-gray-700 px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            Make Query
          </button>
          {showPopup && (
            <Query handleClose={handleClosePopup} serviceName={service.serviceName} />
          )}
        </div>
      </div>
       {showSignUpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Please Log in</h3>
            <p className="text-gray-600 mb-6">
              You need to sign up to make a reservation or query. Please sign up or log in to continue.
            </p>
            <button
              onClick={handleCloseSignUpModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              &#10005;
            </button>
            <div className="text-center">
              <button
                onClick={handleCloseSignUpModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
