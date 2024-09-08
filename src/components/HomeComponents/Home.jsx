import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeroImg from "../../assets/homepage-spinning-pic.png";

const Home = ({ id }) => {
    const [serviceName, setServiceName] = useState('');
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8081/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        if (dropdownVisible) {
            setFilteredServices(
                serviceName
                    ? services.filter(service =>
                        service.serviceName.toLowerCase().includes(serviceName.toLowerCase())
                    )
                    : services
            );
        }
    }, [serviceName, dropdownVisible, services]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputClick = () => {
        setDropdownVisible(true);
    };

    const handleServiceSelect = (service) => {
        setServiceName(service.serviceName);
        navigate(`services/${service.serviceId}`);
        setDropdownVisible(false);
    };

    return (
        <section id={id} className="relative min-h-screen flex flex-col justify-center items-center bg-[url('./assets/homepage-bg-pic.jpg')] bg-cover bg-no-repeat">
            <div className="container mx-auto px-5 flex flex-col lg:flex-row items-center justify-center space-y-10 lg:space-y-0 lg:space-x-20">
                <div className="text-center lg:text-left lg:w-1/2 space-y-6">
                    <h1 className="text-5xl font-bold text-white leading-tight">Welcome to</h1>
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
                        ABC <span className="text-yellow-400">Restaurant</span>
                    </h2>
                    <p className="text-lg text-white">
                        Discover a world of exquisite flavors and delightful dishes that bring joy to your taste buds. From our carefully curated ingredients to our innovative recipes, freshness, and quality.
                    </p>

                    <div className="relative" ref={dropdownRef}>
                        <input
                            type="text"
                            placeholder="Looking for our services..."
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            onClick={handleInputClick}
                            ref={inputRef}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />

                        {dropdownVisible && filteredServices.length > 0 && (
                            <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                                {filteredServices.map((service, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleServiceSelect(service)}
                                        className="p-3 cursor-pointer hover:bg-gray-100"
                                    >
                                        {service.serviceName}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="mt-8">
                        <button className="px-8 py-3 text-lg font-bold border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all rounded-full duration-200">
                            Order Now
                        </button>
                    </div>
                </div>

                <div className="flex justify-center lg:w-1/2">
                    <img
                        src={HeroImg}
                        alt="Hero Image"
                        className="w-[350px] sm:w-[450px] transform sm:scale-10 spin"
                    />
                </div>
            </div>
        </section>
    );
};

export default Home;
