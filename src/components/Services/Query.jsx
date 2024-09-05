import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MakeQueryPopup = ({ handleClose, serviceName }) => {
    const [formData, setFormData] = useState({
        serviceName: serviceName || '',
        email: '',
        query: '',
    });
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClosePopup = () => {
        navigate(-1);
    };

    console.log('Received serviceName:', serviceName);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.serviceName) newErrors.serviceName = 'Service Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.query) newErrors.query = 'Query is required';
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                await axios.post('http://localhost:8081/query', formData);
                setShowSuccess(true);
                setFormData({ serviceName: '', email: '', query: '' });
            } catch (error) {
                console.error('Error submitting query:', error);
            }
        }
    };

    return (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center">
            <div className="p-4 shadow-lg bg-white rounded-lg duration-200 w-[400px] max-h-[97vh] overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thin">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-extrabold text-gray-800">Make a Query</h1>
                    <IoCloseOutline
                        className="text-4xl cursor-pointer hover:text-gray-600 mb-5"
                        onClick={handleClosePopup}
                        style={{
                            color: "black",
                            backgroundColor: "#ffffff",
                            padding: "2px",
                            borderRadius: "50%",
                        }}
                    />
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {[
                        { label: "Service Name", name: "serviceName", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Query", name: "query", type: "text" },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {label}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={`Enter ${label}`}
                                className={`w-full rounded-lg border text-black ${
                                    errors[name] ? "border-red-500" : "border-gray-300"
                                } px-3 py-2`}
                            />
                            {errors[name] && (
                                <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-500 to-blue-600 text-white font-semibold py-2 rounded-lg hover:from-yellow-600 hover:to-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                    {showSuccess && (
                        <p className="text-green-500 text-xl mt-1 text-center">Query Submitted Successfully!</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default MakeQueryPopup;
