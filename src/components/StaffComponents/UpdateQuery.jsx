import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateQuery() {
    const location = useLocation();
    const navigate = useNavigate();

    const queryToEdit = location.state?.query || {};

    const [formData, setFormData] = useState({
        serviceName: queryToEdit.serviceName || '',
        email: queryToEdit.email || '',
        query: queryToEdit.query || '',
        response: queryToEdit.response || '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8081/query/${queryToEdit.queryId}`, formData)
            .then(response => {
                console.log('Query updated successfully:', response.data);
                alert("Query updated successfully");
                navigate('/query-list'); 
            })
            .catch(error => {
                console.error('There was an error updating the Query:', error);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative w-[1000px]">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Query</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Service Name</label>
                        <input
                            type="text"
                            name="serviceName"
                            value={formData.serviceName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Query</label>
                        <input
                            type="text"
                            name="query"
                            value={formData.query}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Response</label>
                        <textarea
                            name="response"
                            value={formData.response}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            rows="5" 
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-gray-900 text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            Update Query
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateQuery;
