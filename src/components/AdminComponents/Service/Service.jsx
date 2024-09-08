import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { DocumentIcon } from '@heroicons/react/16/solid';

const Service = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const servicesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchServicesAndImages = async () => {
      try {
        const response = await axios.get('http://localhost:8081/services');
        const servicesData = response.data;

        const updatedServices = await Promise.all(
          servicesData.map(async (service) => {
            try {
              const imageResponse = await axios.get(
                `http://localhost:8081/services/${service.serviceId}/image`,
                { responseType: 'blob' }
              );
              const imageUrl = URL.createObjectURL(imageResponse.data);
              return { ...service, imageUrl };
            } catch (error) {
              console.error(
                'Error fetching image for Service ID:',
                service.serviceId,
                error
              );
              return { ...service, imageUrl: 'placeholder-image-url' };
            }
          })
        );

        setServices(updatedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesAndImages();
  }, []);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(services.length / servicesPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  const filteredServices = services.filter(service => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      (service.serviceId?.toString().toLowerCase().includes(lowerSearchTerm)) ||
      service.serviceName?.toLowerCase().includes(lowerSearchTerm) ||
      service.description?.toLowerCase().includes(lowerSearchTerm) ||
      service.price?.toString().includes(lowerSearchTerm)
    );
  });

  const handleVisibilityClick = (service) => {
    navigate(`/services/${service.serviceId}`, { state: { service } });
  };

  const handleEditClick = (service) => {
    navigate(`/update-service/${service.serviceId}`, { state: { service } });
  };

  const handleDeleteClick = (service) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      axios.delete(`http://localhost:8081/services/${service.serviceId}`)
        .then(() => {
          alert("Service deleted successfully!");
          setServices(services.filter(service1 => service1.serviceId !== service.serviceId));
        })
        .catch((error) => {
          console.error("There was an error deleting the service:", error);
          alert("Failed to delete service. Please try again.");
        });
    }
  };

  return (
    <div className=' p-6 bg-gray-100 min-h-screen space-y-6 shadow-md rounded-lg p-4 mt-6 relative w-[1000px]'>
      <h1 className="text-4xl font-bold text-gray-900 flex items-center space-x-3">
        <DocumentIcon className="h-10 w-10 text-gray-900" />
        <span>Service Management</span>
      </h1>
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex">
            <input
              type="text"
              className="w-full max-w-xs rounded-md px-2 py-2 text-sm text-gray-600 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 pl-10"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 px-2 py-2 rounded-md flex items-center justify-center">
              <BiSearch />
            </button>
          </div>
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded-md"
            onClick={() => navigate('/admin-add-service')} 
          >
            Add Service
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-900"></div>
        </div>
      ) : 
        <div className="overflow-x-auto mt-3">
          <div className="table-container">
            <table className="min-w-full bg-gray-800 text-gray-400">
              <thead className="bg-gray-700 text-gray-500 uppercase text-xs font-medium">
                <tr>
                  <th className="p-3 text-left">Service ID</th>
                  <th className="p-3 text-left">Service Name</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredServices.slice(indexOfFirstService, indexOfLastService).map((service) => (
                  <tr key={service.serviceId} className="hover:bg-gray-700 cursor-pointer">
                    <td className="p-3 font-bold">{service.serviceId}</td>
                    <td className="p-3">{service.serviceName}</td>
                    <td className="p-3">{service.description}</td>
                    <td className="p-3">{service.price}$</td>
                    <td className="p-3">
                      <img src={service.imageUrl} alt={service.serviceName} className="w-16 h-16 object-cover" />
                    </td>
                    <td className="p-3">
                      <a href="#" onClick={() => handleVisibilityClick(service)} className="text-gray-400 hover:text-gray-100 inline-flex items-center">
                        <span className="material-icons-outlined text-[25px] leading-none">visibility</span>
                      </a>
                      <button
                        className="text-gray-400 hover:text-gray-100 inline-flex items-center ml-2 p-0 bg-transparent border-none"
                        onClick={() => handleEditClick(service)}
                      >
                        <span className="material-icons-outlined text-[25px] leading-none">edit</span>
                      </button>
                      <a href="#" onClick={() => handleDeleteClick(service)} className="text-gray-400 hover:text-gray-100 inline-flex items-center ml-2">
                        <span className="material-icons-round text-[25px] leading-none">delete_outline</span>
                      </a>
                    </td>
                  </tr>
                ))}
                 {filteredServices.length === 0 && (
                            <tr>
                                <td colSpan="10" className="p-4 text-center text-gray-300">
                                    No services found.
                                </td>
                            </tr>
                        )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <button
              className="px-3 py-1 bg-gray-700 text-gray-400 rounded hover:bg-gray-600"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers.map(number => (
              <button
                key={number}
                className={`px-3 py-1 ${currentPage === number ? 'bg-gray-600 text-gray-100' : 'bg-gray-700 text-gray-400'} rounded hover:bg-gray-600`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))}
            <button
              className="px-3 py-1 bg-gray-700 text-gray-400 rounded hover:bg-gray-600"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={indexOfLastService >= services.length}
            >
              Next
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default Service;
