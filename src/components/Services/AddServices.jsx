import React, { useState } from "react";
import axios from "axios";

const AddServices = () => {
  const [services, setServices] = useState({
    serviceName: "",
    description: "",
    availability: "",
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
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          
          
          <div className="col-12">
            <label className="form-label">
              <h6>Service Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="serviceName"
              value={services.serviceName}
              name="serviceName"
              onChange={handleInputChange}
              id="serviceName"
            />
          </div>
          <div className="col-5">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="description"
              onChange={handleInputChange}
              value={services.description}
              name="description"
              id="description"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Availability</h6>
            </label>
            <select
              className="form-select"
              value={services.availability}
              onChange={handleInputChange}
              name="availability"
              id="availability"
            >
              <option value="">Select Availability</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
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
