import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import StaffPopup from './StaffPopup';

function Query() {
    const [queries, setQueries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const queriesPerPage = 5; // Corrected variable name to be more descriptive

    const indexOfLastQuery = currentPage * queriesPerPage;
    const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
    const currentQueries = queries.slice(indexOfFirstQuery, indexOfLastQuery);
    
    const totalPages = Math.ceil(queries.length / queriesPerPage);
    const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

    const [searchTerm, setSearchTerm] = useState('');

    // Filtering logic for queries
    const filteredQueries = queries.filter(query => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        
        // Ensure that all relevant fields are properly checked
        const queryIdMatch = typeof query.queryId === 'string' && query.queryId.toLowerCase().includes(lowerSearchTerm);
        const serviceNameMatch = typeof query.serviceName === 'string' && query.serviceName.toLowerCase().includes(lowerSearchTerm);
        const emailMatch = typeof query.email === 'string' && query.email.toLowerCase().includes(lowerSearchTerm);
        const queryTextMatch = typeof query.query === 'string' && query.query.toLowerCase().includes(lowerSearchTerm); // Assuming query field is a string
        const responseMatch = typeof query.response === 'string' && query.response.toLowerCase().includes(lowerSearchTerm);
        
        return queryIdMatch || serviceNameMatch || emailMatch || queryTextMatch || responseMatch;
    });

    const navigate = useNavigate();

    // Handle navigation to edit page
    const handleEditClick = (query) => {
        navigate('/query-update', { state: { query: query } }); // Placeholder route
    };

    useEffect(() => {
        axios.get("http://localhost:8081/query")
            .then((response) => {
                if (response.status === 200 && response.data) {
                    setQueries(response.data); // Update state with fetched data
                }
            })
            .catch((error) => {
                console.log("No Queries:", error);
            });
    }, []);

    const handleVisibilityClick = (query) => {
        setSelectedQuery(query);
    };

    const handleClosePopup = () => {
        setSelectedQuery(null);
    };

    return (
        <div className='h-screen pt-10 relative w-[1000px]'>
            <div className="flex items-center space-x-2 justify-end mt-10">
                <div className="relative flex">
                    <input
                        type="text"
                        className="w-full max-w-xs rounded-md px-2 py-2 text-sm text-gray-600 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 pl-10"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 px-2 py-2 rounded-md flex items-center justify-center"
                    >
                        <BiSearch />
                    </button>
                </div>
            </div>

            <div className="overflow-auto mt-3">
                <table className="min-w-full bg-gray-800 text-gray-400">
                    <thead className="bg-gray-700 text-gray-500 uppercase text-xs font-medium">
                        <tr>
                            <th className="p-3 text-left">Query ID</th>
                            <th className="p-3 text-left">Service Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Query</th>
                            <th className="p-3 text-left">Response</th>
                            <th className="p-3 text-left">Actions</th> {/* Added Actions column */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredQueries.map((query, index) => (
                            <tr key={index} className="hover:bg-gray-700">
                                <td className="p-3 font-bold">{query.queryId}</td>
                                <td className="p-3">{query.serviceName}</td>
                                <td className="p-3">{query.email}</td>
                                <td className="p-3">{query.query}</td>
                                <td className="p-3">{query.response}</td>
                                <td className="p-3 flex space-x-2">
                                    <a href="#" onClick={() => handleVisibilityClick(query)} className="text-gray-400 hover:text-gray-100 inline-flex items-center">
                                        <span className="material-icons-outlined text-[25px] leading-none">visibility</span>
                                    </a>
                                    <button
                                        className="text-gray-400 hover:text-gray-100 inline-flex items-center ml-2 p-0 bg-transparent border-none"
                                        onClick={() => handleEditClick(query)}
                                    >
                                        <span className="material-icons-outlined text-[25px] leading-none">edit</span>
                                    </button>
                                    <a href="#" className="text-gray-400 hover:text-gray-100 inline-flex items-center ml-2">
                                        <span className="material-icons-round text-[25px] leading-none">delete_outline</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                        disabled={indexOfLastQuery >= queries.length}
                    >
                        Next
                    </button>
                </div>
            </div>
            {selectedQuery && (
                <StaffPopup query={selectedQuery} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default Query;
