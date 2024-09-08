import React, { useState } from "react";
import axios from "axios";

const AddServices = () => {
  const [services, setServices] = useState({
    serviceName: "",
    description: "",
    price: "",
    instructions: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServices({ ...services, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
      .post("http://localhost:8081/services", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Services added successfully:", response.data);
        alert("Services added successfully");
      })
      .catch((error) => {
        console.error("Error adding services:", error);
        alert("Error adding services");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative w-[1000px]">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Service</h2>
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
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServices;