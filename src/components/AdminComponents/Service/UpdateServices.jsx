import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateService = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const service = location.state?.service || {}; 
    const serviceId = service.serviceId; 

    const [services, setServices] = useState({
      serviceName: service.serviceName || "",
      description: service.description || "",
      price: service.price || "",
      instructions: service.instructions || "",
    });
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(""); 

    useEffect(() => {
        if (!service.serviceName) {
            axios
              .get(`http://localhost:8081/services/${serviceId}`)
              .then((response) => {
                setServices({
                  serviceName: response.data.serviceName,
                  description: response.data.description,
                  price: response.data.price,
                  instructions: response.data.instructions,
                });
              })
              .catch((error) => {
                console.error("Error fetching service details:", error);
              });
        }

    
        axios
          .get(`http://localhost:8081/services/${serviceId}/image`, { responseType: "blob" })
          .then((response) => {
            const imageUrl = URL.createObjectURL(response.data);
            setImageUrl(imageUrl);
          })
          .catch((error) => {
            console.error("Error fetching service image:", error);
          });
    }, [serviceId, service]);

    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage)); 
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setServices({ ...services, [name]: value });
    };

    

    const submitHandler = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("imageFile", image);
      formData.append(
        "services",
        new Blob([JSON.stringify(services)], { type: "application/json" })
      );

      axios
        .put(`http://localhost:8081/services/${serviceId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert("Service updated successfully");
          navigate("/admin-service"); 
        })
        .catch((error) => {
          alert("Error updating service");
        });
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 relative w-[1000px]">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Service</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Service Name</label>
              <input
                type="text"
                name="serviceName"
                value={services.serviceName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={services.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={services.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Instructions</label>
              <input
                type="text"
                name="instructions"
                value={services.instructions}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Image</label>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Service"
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
              ) : (
                <p>No image available</p>
              )}
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Update Service
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default UpdateService;
