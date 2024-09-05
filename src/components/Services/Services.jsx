import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServicesAndImages = async () => {
      try {
        // Fetch all services first
        const response = await axios.get("http://localhost:8081/services");
        const servicesData = response.data;

        // Fetch images for each service and update the service data with image URLs
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

  const addToCart = (service) => {
    // Function to handle adding a service to the cart
    console.log("Adding to cart:", service);
    // You can implement your cart logic here
  };

  return (
    <div className="services-container">
      <h1>Services</h1>
      <div className="services-grid">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              className="card mb-3"
              style={{
                width: "18rem",
                height: "24rem",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
                backgroundColor: "#ccc",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
              }}
              key={service.serviceId}
            >
              <Link
                to={`/services/${service.serviceId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={service.imageUrl}
                  alt={service.serviceName}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    padding: "5px",
                    margin: "0",
                  }}
                />
                <div
                  className="buttons"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: "1",
                  }}
                >
                  <div className="buttons-liked">
                    <i className="bi bi-heart"></i>
                  </div>
                </div>
                <div
                  className="card-body"
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <div>
                    <h5
                      className="card-title"
                      style={{ margin: "0 0 10px 0" }}
                    >
                      {service.serviceName}
                    </h5>
                    <i className="card-brand" style={{ fontStyle: "italic" }}>
                      {"~ " + service.availability}
                    </i>
                  </div>
                  <div>
                    <h5
                      className="card-text"
                      style={{ fontWeight: "600", margin: "5px 0" }}
                    >
                      {"$" + service.serviceId}
                    </h5>
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(service);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </div>
  );
};

export default Services;
